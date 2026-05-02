import { NextResponse } from "next/server";

export const revalidate = 60;

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  videoMediaMetadata?: { durationMillis?: string };
};

export async function GET() {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!folderId || !apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_DRIVE_FOLDER_ID or GOOGLE_API_KEY env var" },
      { status: 500 }
    );
  }

  const q = `'${folderId}' in parents and mimeType contains 'video/' and trashed=false`;
  const url =
    `https://www.googleapis.com/drive/v3/files` +
    `?q=${encodeURIComponent(q)}` +
    `&fields=${encodeURIComponent(
      "files(id,name,mimeType,videoMediaMetadata(durationMillis))"
    )}` +
    `&orderBy=name` +
    `&key=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    const detail = await res.text();
    return NextResponse.json(
      { error: "Drive API request failed", status: res.status, detail },
      { status: 502 }
    );
  }

  const { files } = (await res.json()) as { files: DriveFile[] };

  const videos = files
    .slice()
    .sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR", {
        sensitivity: "base",
        numeric: true,
      })
    )
    .map((f) => {
      const ms = Number(f.videoMediaMetadata?.durationMillis);
      return {
        id: f.id,
        name: f.name,
        src: `https://drive.google.com/file/d/${f.id}/preview`,
        durationMs: Number.isFinite(ms) && ms > 0 ? ms : 30000,
      };
    });

  return NextResponse.json({ videos });
}
