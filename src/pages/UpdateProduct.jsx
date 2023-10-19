import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const {name, slug: oldSlug, image, type, category, price, rating, shortDescription} = useLoaderData();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://brand-shop-server.vercel.app/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
  }, []);

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

    fetch(`https://brand-shop-server.vercel.app/products/${oldSlug}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(updateProduct)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount === 1) {
          toast.success('Product Updated !!!');
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
          <div className="bg-primary bg-opacity-10 dark:bg-secondary dark:bg-opacity-10 dark:text-white p-6 rounded-md max-w-[900px] mx-auto">
            <h2 className="text-3xl font-medium text-center mb-6">Update Product</h2>
            <form className="space-y-4" onSubmit={handleUpdate}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="name">Name</label>
                  <input className="input w-full border-gray-300" type="text" name="name" id="name" placeholder="Enter product name" defaultValue={name} required />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="image">Image</label>
                  <input className="input w-full border-gray-300" type="text" name="image" id="image" placeholder="Enter product image URL" defaultValue={image} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="type">Type</label>
                  <select className="select w-full border-gray-300" name="type" id="type" required>
                    <option value="Smartphone" selected={type === "Smartphone" ? "selected" : ""}>Smartphone</option>
                    <option value="Laptop" selected={type === "Laptop" ? "selected" : ""}>Laptop</option>
                    <option value="Camera" selected={type === "Camera" ? "selected" : ""}>Camera</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="category">Brand Name</label>
                  <select className="select w-full border-gray-300" name="category" id="category" required>
                    {
                      categories.map(item => <option key={item?._id} value={item?.name} selected={category === item?.name ? "selected" : ""}>{item?.name}</option>)
                    }
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="price">Price (Taka)</label>
                  <input className="input w-full border-gray-300" type="number" name="price" id="price" placeholder="Enter product price" defaultValue={price} required />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="rating">Rating (Out of 5)</label>
                  <input className="input w-full border-gray-300" type="number" step='0.1' name="rating" id="rating" placeholder="Enter product rating" defaultValue={rating} required />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2" htmlFor="short-description">Short Description</label>
                <textarea className="textarea resize-none w-full border-gray-300 leading-normal text-base h-[120px]" name="short-description" id="short-description" placeholder="Write short description of this product" defaultValue={shortDescription} required></textarea>
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