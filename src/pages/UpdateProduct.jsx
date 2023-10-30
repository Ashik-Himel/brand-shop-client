import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "../ContextProvider";

const UpdateProduct = () => {
  const {user} = useContext(UserContext);
  const {slug: oldSlug} = useParams()
  const {data: product} = useQuery({queryKey: ["updateProduct", oldSlug], queryFn: () => axiosInstance(`/products/${oldSlug}`, {headers: {Authorization: `Bearer ${user?.email}`}})});
  const {data: categories} = useQuery({queryKey: ["categories"], queryFn: () => axiosInstance('/categories')});
  const navigate = useNavigate();

  const handleUpdate = e => {
    e.preventDefault();

    const name = e.target.name.value;
    const slug = name.trim().replaceAll(' ', '-').toLowerCase();
    const image = e.target.image.value;
    const type = e.target.type.value;
    const category = e.target.category.value;
    const price = e.target.price.value;
    const rating = e.target.rating.value;
    const shortDescription = e.target['short-description'].value;
    const updateProduct = {name, slug, image, type, category, price, rating, shortDescription};

    axiosInstance.put(`/products/${oldSlug}`, updateProduct, {headers: {Authorization: `Bearer ${user?.email}`}})
      .then(data => {
        if (data.data.modifiedCount === 1) {
          toast.success('Product Updated !!!');
          scrollTo(0, 0);
          navigate(`/products/${slug}`)
        }
      })
      .catch(error => {
        toast.error(error.code);
      })
  }

  return (
    <main className="my-12">
      <Helmet>
        <title>Update Product - Brand Shop</title>
      </Helmet>
      
      <section>
        <div className="container">
          <div className="bg-primary bg-opacity-10 dark:bg-gray-800 dark:text-white p-6 rounded-md max-w-[900px] mx-auto">
            <h2 className="text-3xl font-medium text-center mb-6">Update Product</h2>
            <form className="space-y-4" onSubmit={handleUpdate}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="name">Name</label>
                  <input className="input w-full border-gray-300" type="text" name="name" id="name" placeholder="Enter product name" defaultValue={product?.data?.name} required />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="image">Image</label>
                  <input className="input w-full border-gray-300" type="text" name="image" id="image" placeholder="Enter product image URL" defaultValue={product?.data?.image} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="type">Type</label>
                  <select className="select w-full border-gray-300" name="type" id="type" required>
                    <option value="Smartphone" selected={product?.data?.type === "Smartphone" ? "selected" : ""}>Smartphone</option>
                    <option value="Laptop" selected={product?.data?.type === "Laptop" ? "selected" : ""}>Laptop</option>
                    <option value="Camera" selected={product?.data?.type === "Camera" ? "selected" : ""}>Camera</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="category">Brand Name</label>
                  <select className="select w-full border-gray-300" name="category" id="category" required>
                    {
                      categories?.data?.map(item => <option key={item?.name} value={item?.name} selected={product?.data.category === item?.name ? "selected" : ""}>{item?.name}</option>)
                    }
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="price">Price (Taka)</label>
                  <input className="input w-full border-gray-300" type="number" name="price" id="price" placeholder="Enter product price" defaultValue={product?.data?.price} required />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="rating">Rating (Out of 5)</label>
                  <input className="input w-full border-gray-300" type="number" step='0.1' name="rating" id="rating" placeholder="Enter product rating" defaultValue={product?.data?.rating} required />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2" htmlFor="short-description">Short Description</label>
                <textarea className="textarea resize-none w-full border-gray-300 leading-normal text-base h-[120px]" name="short-description" id="short-description" placeholder="Write short description of this product" defaultValue={product?.data?.shortDescription} required></textarea>
              </div>
              <input className="btn btn-primary btn-block" type="submit" value="Update Product" />
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UpdateProduct;