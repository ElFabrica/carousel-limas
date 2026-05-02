"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

export function ButtonFullScreen() {
  const [isFull, setIsFull] = useState(false);
  const handleFullscreen = useCallback(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      setIsFull(true);
    } else if ((document.documentElement as any).webkitRequestFullscreen) {
      (document.documentElement as any).webkitRequestFullscreen(); // Safari
      setIsFull(true);
    } else if ((document.documentElement as any).msRequestFullscreen) {
      (document.documentElement as any).msRequestFullscreen(); // IE/Edge antigo
      setIsFull(true);
    }
  }, []);

  if (isFull) {
    return null;
  }
  return (
    <button
      onClick={handleFullscreen}
      className="absolute bottom-3 right-3 cursor-pointer"
    >
      <Image src="/full.svg" alt="Full Alt" width={30} height={30} />
    </button>
  );
}
