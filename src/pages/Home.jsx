import { Helmet } from "react-helmet-async";
import CategoriesSection from "../components/CategoriesSection";
import HomeCardsSection from "../components/HomeCardsSection";
import HomeBanner from "../components/HomeBanner";

const Home = () => {
  return (
    <main className="mb-12">
      <Helmet>
        <title>Brand Shop - Gadget and Accessories Seller</title>
      </Helmet>

      <CategoriesSection />
      <HomeCardsSection type="Smartphone" />
      <HomeBanner />
      <HomeCardsSection type="Laptop" />
    </main>
  );
};

export default Home;
