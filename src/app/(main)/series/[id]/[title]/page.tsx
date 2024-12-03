import Banner from "./_components/banner";
import Details from "./_components/details";

export default function Series() {
  return (
    <>
      <main className="main">
        <Banner />
        <div className="content-wrapper">
          <Details />

          {/* Navigation */}
        </div>
      </main>

      <footer></footer>
    </>
  );
}
