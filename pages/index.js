import Head from "next/head";
import Carousel from "../components/carousel/Carousel";
import Section from "../components/section/Section";
import TrendingSection from "../components/trending/TrendingSection";
import { getHomePage } from "../utils/api";

export async function getStaticProps() {
  const homeData = await getHomePage();
  return {
    props: {
      homeData,
    },
  };
}

export default function Home(props) {
  const {
    homeData: { carouselData, combinedData, trendingData },
  } = props;

  return (
    <>
      <Head>
        <title>UniMovie</title>
      </Head>

      <Carousel carouselData={carouselData} />

      <div className="max-w-[1450px] mx-auto">
        {Object.keys(combinedData)
          .slice(0, 2)
          .map((item, index) => (
            <Section section={item} data={combinedData[item]} key={index} />
          ))}
        <TrendingSection trendingData={trendingData} />
        {Object.keys(combinedData)
          .slice(3, 5)
          .map((item, index) => (
            <Section section={item} data={combinedData[item]} key={index} />
          ))}
      </div>
    </>
  );
}
