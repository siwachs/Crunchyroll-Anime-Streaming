import Banner from "./_components/banner";
import Details from "./_components/details";
import Navigation from "./_components/navigation";

export default function Series() {
  return (
    <>
      <main>
        <Banner />

        <div className="content-wrapper mb-14 md:mb-0">
          <Details />
          <Navigation />
        </div>
      </main>

      <footer></footer>
    </>
  );
}
