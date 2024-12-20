import VideoPlayer from "./_components/videoPlayer";
import MediaDetails from "./_components/currentMedia";
import Videos from "./_components/videos";

import "./page.css";

export default function Watch() {
  return (
    <>
      <main>
        <VideoPlayer />

        <div className="content-wrapper">
          <div className="body">
            <MediaDetails />
            <Videos />
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
}
