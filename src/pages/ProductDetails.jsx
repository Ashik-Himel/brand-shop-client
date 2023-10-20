import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserContext } from "../ContextProvider";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const {name, slug, image, category, price, shortDescription} = useLoaderData();
  const [categoryImg, setCategoryImg] = useState({});
  const {user} = useContext(UserContext);
  const {uid, email} = user;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://brand-shop-server.vercel.app/categories/${category}`)
      .then(res => res.json())
      .then(data => setCategoryImg(data?.image));
  }, [category])

  const handleAddToCart = e => {
    e.preventDefault();

    const quantity = Number(e.target.quantity.value);
    const subTotal = Number(price) * quantity;
    const cartProduct = {uid, email, items: [[slug, quantity, subTotal]]};

    fetch(`https://brand-shop-server.vercel.app/usersCart/${uid}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(cartProduct)
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Product added to the cart !!!');
        navigate('/cart');
      })
  }

  return (
    <main className="py-12">
      <Helmet>
        <title>{name} - Brand Shop</title>
      </Helmet>
      
      <section>
        <div className="container">
          <div className="flex flex-col md:flex-row [&>*]:flex-1 justify-center items-center gap-6 bg-primary bg-opacity-10 dark:bg-gray-800 dark:text-white p-8 rounded-lg">
            <div className="max-w-[500px] p-4 md:p-10">
              <img className="w-full max-w-[320px]" src={image} alt={name} />
            </div>
            <div>
              <img className="mb-4 h-full max-h-[50px]" src={categoryImg} alt="Category Image" />
              <h2 className="text-3xl font-medium mb-1">{name}</h2>
              <span className="text-xl block mb-6">&#2547; {Number(price).toLocaleString()} Taka</span>
              <p className="text-gray-500 dark:text-gray-300 mb-8">{shortDescription}</p>
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