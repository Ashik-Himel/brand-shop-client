import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserContext } from "../ContextProvider";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const {name, slug, image, category, price, shortDescription} = useLoaderData();
  const [categoryImg, setCategoryImg] = useState({});
  const [cartData, setCartData] = useState([[]]);
  const {user} = useContext(UserContext);
  const email = user?.email;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://brand-shop-server.vercel.app/categories/${category}`)
      .then(res => res.json())
      .then(data => setCategoryImg(data?.image));
    fetch(`https://brand-shop-server.vercel.app/users/${email}`)
      .then(res => res.json())
      .then(data => setCartData(data?.userCart || [[]]))
  }, [category, email])

  const handleAddToCart = e => {
    e.preventDefault();

    const quantity = e.target.quantity.value;
    if (!cartData.flat().includes(slug)) {
      setCartData([...cartData, [slug, quantity]]);
      const updatedCart = {email, userCart: cartData};

      fetch(`https://brand-shop-server.vercel.app/users/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(updatedCart)
      })
        .then(res => res.json())
        .then(() => {
          toast.success('Added to cart !!!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate('/cart');
        })
    } else {
      toast.success('Already exist in cart !!!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <main className="py-12">
      <Helmet>
        <title>{name} - Brand Shop</title>
      </Helmet>
      
      <section>
        <div className="container">
          <div className="flex flex-col md:flex-row [&>*]:flex-1 justify-center items-center gap-6 bg-primary bg-opacity-10 dark:bg-secondary dark:bg-opacity-10 dark:text-white p-8 rounded-lg">
            <div className="max-w-[500px] p-4 md:p-10 lg:p-16">
              <img className="max-h-[400px]" src={image} alt={name} />
            </div>
            <div>
              <img className="max-h-10 mb-4" src={categoryImg} alt="Category Image" />
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

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  );
};

export default ProductDetails;