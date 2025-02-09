import "./menuItems.css";

const MarkSeriesAsWatched: React.FC<{ seriesId: string }> = ({ seriesId }) => {
  return <button className="menu-item">Mark Series as Watched</button>;
};

export default MarkSeriesAsWatched;
