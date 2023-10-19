import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import PropTypes from 'prop-types';

const HomeCardsSection = ({type}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`https://brand-shop-server.vercel.app/products/types/${type}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 4)));
  }, [type]);

  return (
    <section className="mt-12">
      <div className="container">
        <h2 className="text-primary text-3xl font-medium border-b-2 border-primary pb-1 mb-6 max-w-[220px]">
          {type}s
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <HomeCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCardsSection;

HomeCardsSection.propTypes = {
  type: PropTypes.string
}