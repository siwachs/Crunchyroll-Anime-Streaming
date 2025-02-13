import { useState, useEffect } from "react";

export default function useWindowResolution() {
  const [resolution, setResolution] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
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
