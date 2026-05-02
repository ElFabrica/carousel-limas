import { readdir } from "node:fs/promises";
import path from "node:path";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const dir = path.join(process.cwd(), "public", "today");
  const files = await readdir(dir);
  const videos = files
    .filter((f) => /\.(mov|mp4|webm|ogg)$/i.test(f))
    .sort()
    .map((f) => `/today/${f}`);

  return <Carousel videos={videos} />;
}
