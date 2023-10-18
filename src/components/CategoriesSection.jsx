import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('https://brand-shop-server.vercel.app/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, []);

  return (
    <section className="bg-primary bg-opacity-10">
      <div className="container">
        <Marquee className="py-6" pauseOnHover>
          {
            categories.map(category => <Link to={`/products/categories/${category.name}`} className="flex flex-col justify-center items-center gap-2 p-8 cursor-pointer" key={category?._id}>
              <img className="h-[40px] block" src={category?.image} alt={category?.name} />
              <h4 className="text-black text-2xl">{category?.name}</h4>
            </Link>)
          }
        </Marquee>
      </div>
    </section>
  );
};

export default CategoriesSection;