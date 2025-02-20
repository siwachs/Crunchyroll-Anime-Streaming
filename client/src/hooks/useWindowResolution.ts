import { useState, useEffect } from "react";

export default function useWindowResolution() {
  const [resolution, setResolution] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const resizeWindow = () => {
      setResolution({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resizeWindow);

    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  return resolution;
}
