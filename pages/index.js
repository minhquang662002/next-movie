import Head from "next/head";
import Carousel from "../components/Carousel";
import Section from "../components/Section";
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

      <div className="max-w-[200px] md:max-w-[650px] lg:max-w-[980px] xl:max-w-[1250px] mx-auto">
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
