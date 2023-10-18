import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const {name, image, category, price, shortDescription} = useLoaderData();
  const [categoryImg, setCategoryImg] = useState({});
  useEffect(() => {
    fetch(`https://brand-shop-server.vercel.app/categories/${category}`)
      .then(res => res.json())
      .then(data => setCategoryImg(data?.image))
  }, [category])

  const handleAddToCart = e => {
    e.preventDefault();

    const quantity = e.target.quantity.value;
    console.log(quantity);
  }

  return (
    <main className="py-12">
      <Helmet>
        <title>{name} - Brand Shop</title>
      </Helmet>
      
      <section>
        <div className="container">
          <div className="flex flex-col md:flex-row [&>*]:flex-1 justify-center items-center gap-6 bg-primary bg-opacity-10 p-8 rounded-lg">
            <div className="max-w-[500px] p-4 md:p-10 lg:p-16">
              <img className="max-h-[400px]" src={image} alt={name} />
            </div>
            <div>
              <img className="w-10 mb-4" src={categoryImg} alt="Category Image" />
              <h2 className="text-3xl font-medium mb-1">{name}</h2>
              <span className="text-xl block mb-6">&#2547; {price} Taka</span>
              <p className="text-gray-500 mb-8">{shortDescription}</p>
              <form onSubmit={handleAddToCart} className="flex gap-4">
                <input className="input h-[42px] w-20" type="number" name="quantity" id="quantity" defaultValue='1' required />
                <button className="btn btn-primary" type="submit">Add to Cart</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;