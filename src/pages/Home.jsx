import { Helmet } from "react-helmet-async";
import CategoriesSection from "../components/CategoriesSection";

const Home = () => {
  return (
    <main className="mb-16">
      <Helmet>
        <title>Brand Shop - Gadget and Accessories Seller</title>
      </Helmet>
      
      <CategoriesSection />
    </main>
  );
};

export default Home;