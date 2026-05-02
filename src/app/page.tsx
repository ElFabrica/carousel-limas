"use client";
import { ButtonFullScreen } from "@/components/button";
import { useState, useEffect, useRef } from "react";

// Definição do tipo para os objetos de vídeo
interface VideoItem {
  url: string;
}

const videos: VideoItem[] = [
  {
    url: "video.mp4",
  },
  {
    url: "video02.mp4",
  },
  {
    url: "IMG_0728.MOV",
  },
  {
    url: "video03.mp4",
  },
  {
    url: "video05.mp4",
  },
  {
    url: "video06.mp4",
  },
  {
    url: "video07.mp4",
  },
  {
    url: "video08.mp4",
  },
  {
    url: "video09.mp4",
  },
  {
    url: "video10.mp4",
  },
  {
    url: "video11.mp4",
  },
  {
    url: "video12.mp4",
  },
  {
    url: "video13.mp4",
  },
  {
    url: "video14.mp4",
  },
];

// Componente ButtonFullScreen simulado

export default function Home() {
  const [isPause, setIsPaused] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Função para ir para o próximo vídeo
  function handleVideoEnd() {
    setCurrentVideoIndex((prevIndex) => {
      // Volta para o primeiro vídeo quando chegar ao final
      return (prevIndex + 1) % videos.length;
    });
  }

  // Atualiza o src do vídeo quando o índice muda
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load(); // Recarrega o vídeo com o novo src
      video.play(); // Reproduz automaticamente
    }
  }, [currentVideoIndex]);

  function handlePause() {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPaused(false);
      } else {
        video.pause();
        setIsPaused(true);
      }
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black">
      <video
        ref={videoRef}
        src={videos[currentVideoIndex].url}
        autoPlay
        controls={true}
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className="w-full h-screen object-cover cursor-pointer"
      />

      {isPause && (
        <svg
          className="absolute w-32 h-32 z-20 inset-0 m-auto text-white pointer-events-none"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}

      <ButtonFullScreen />
    </main>
  );
}
