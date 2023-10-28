import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../ContextProvider";
import toast from "react-hot-toast";
import { axiosInstance } from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";

const ProductDetails = () => {
  const {slug} = useParams();
  const {data : product, isLoading} = useQuery({queryKey: [slug], queryFn: () => axiosInstance(`/products/${slug}`)});
  const {data : category, isLoading: isLoading2} = useQuery({queryKey: ["category", product?.data.category], queryFn: () => axiosInstance(`/categories/${product?.data.category}`)});
  const {user} = useContext(UserContext);
  const {uid, email} = user;
  const navigate = useNavigate();

  if (isLoading || isLoading2) return <Loading />;

  const handleAddToCart = e => {
    e.preventDefault();

    const quantity = Number(e.target.quantity.value);
    const subTotal = Number(product?.data?.price) * quantity;
    const cartProduct = {uid, email, items: [[slug, quantity, subTotal]]};

    axiosInstance.put(`/usersCart/${uid}`, cartProduct)
      .then(() => {
        toast.success('Product added to the cart !!!');
        scrollTo(0, 0);
        navigate('/cart');
      })
  }

  return (
    <main className="py-12">
      <Helmet>
        <title>{product?.data?.name} - Brand Shop</title>
      </Helmet>
      
      <section>
        <div className="container">
          <div className="flex flex-col md:flex-row [&>*]:flex-1 justify-center items-center gap-6 bg-primary bg-opacity-10 dark:bg-gray-800 dark:text-white p-8 rounded-lg">
            <div className="max-w-[500px] p-4 md:p-10">
              <img className="w-full max-w-[320px]" src={product.data.image} alt={product.data.name} />
            </div>
            <div>
              <img className="mb-4 h-full max-h-[50px]" src={category?.data.image} alt="Category Image" />
              <h2 className="text-3xl font-medium mb-1">{product.data.name}</h2>
              <span className="text-xl block mb-6">&#2547; {Number(product.data.price).toLocaleString()} Taka</span>
              <p className="text-gray-500 dark:text-gray-300 mb-8">{product.data.shortDescription}</p>
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