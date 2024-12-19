import PlayableCard from "@/components/playableCard";

import episodeList from "@/data/episideList";

const EpisodeList: React.FC = () => {
  return (
    <div className="episode-list">
      {episodeList.map((episode, index) => (
        <PlayableCard
          key={index}
          episodeNumber={index + 1}
          thumbnail={episode.thumbnail}
          duration={episode.duration}
          seriesTitle="Dragon Ball DAIMA"
          title={episode.title}
          releaseDate="10/12/2024"
          description="A giant castle in a mysterious world. Two shady Majin,
                      Gomah and Degesu, watch a monitor. The monitor shows Goku
                      and the others having a fierce battle against Majin Buu.
                      Gomah and Degesu head to Earth to execute a certain
                      conspiracy."
          metaTags={episode.metaTags}
        />
      ))}
    </div>
  );
};

export default EpisodeList;
