"use client";

import { useState, useEffect, useMemo, createContext, useContext } from "react";

import { Context } from "./index.types";

const VideoPlayerContext = createContext<Context | undefined>(undefined);

export function useVideoPlayer() {
  const context = useContext(VideoPlayerContext);
  if (!context)
    throw new Error("useVideoPlayer must be used within VideoPlayerProvider");

  return context;
}

export function VideoPlayerProvider({
  children,
  media,
  duration,
}: Readonly<{ children: React.ReactNode; media: string; duration: string }>) {
  const value = useMemo(() => ({}), []);

  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
}
