import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('https://brand-shop-server.vercel.app/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, []);

  return (
    <section className="bg-primary dark:bg-gray-800 bg-opacity-10">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {
            categories.map(category => <Link to={`/products/categories/${category.name}`} className="flex flex-col justify-center items-center gap-2 px-8 py-10 cursor-pointer" onClick={() => scrollTo(0, 0)} key={category?._id}>
              <img className="h-[40px] block" src={category?.image} alt={category?.name} />
              <h4 className="text-black dark:text-white text-2xl">{category?.name}</h4>
            </Link>)
          }
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;