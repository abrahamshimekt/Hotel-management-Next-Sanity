import FeaturedRoom from "@/components/FeaturedRoom";
import Gallery from "@/components/Gallery";
import HeroSection from "@/components/HeroSection";
import NewsLetter from "@/components/NewsLetter";
import PageSearch from "@/components/PageSearch";
import { getFeaturedRoom } from "@/libs/apis";

const Home = async() => {
 const featuredRoom = await getFeaturedRoom();
  return (
    <>
      <HeroSection />
      <PageSearch />
      <FeaturedRoom featuredRoom= {featuredRoom}/>
      <Gallery/>
      <NewsLetter/>
    </>
  );
};
export default Home;
