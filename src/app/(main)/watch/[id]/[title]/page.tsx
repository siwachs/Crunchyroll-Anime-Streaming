import VideoPlayer from "./_components/videoPlayer";
import MediaDetails from "./_components/currentMedia";

import "./page.css";

export default function Watch() {
  return (
    <>
      <main className="main">
        <VideoPlayer />

        <div className="content-wrapper">
          <div className="body">
            <MediaDetails />
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
}
