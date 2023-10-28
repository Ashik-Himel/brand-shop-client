import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import {axiosInstance} from '../hooks/useAxios';

const AddProduct = () => {
  const {data} = useQuery({queryKey: ["categories"], queryFn: () => axiosInstance('/categories')})

  const handleAdd = e => {
    e.preventDefault();

    const name = e.target.name.value;
    const slug = name.trim().replaceAll(' ', '-').toLowerCase();
    const image = e.target.image.value;
    const type = e.target.type.value;
    const category = e.target.category.value;
    const price = e.target.price.value;
    const rating = e.target.rating.value;
    const shortDescription = e.target['short-description'].value;
    const newProduct = {name, slug, image, type, category, price, rating, shortDescription};

    axiosInstance.post('/products', newProduct)
    .then(data => {
      if (data.data.insertedId) {
        toast.success('Product Added !!!');
        e.target.reset();
      }
    })
    .catch(error => {
      toast.error(error.code);
    })
  }

  return (
    <main className="my-12">
      <Helmet>
        <title>Add Product - Brand Shop</title>
      </Helmet>
      
      <section>
        <div className="container">
          <div className="bg-primary dark:bg-gray-800 bg-opacity-10 dark:text-white p-6 rounded-md max-w-[900px] mx-auto">
            <h2 className="text-3xl font-medium text-center mb-6">Add New Product</h2>
            <form className="space-y-4" onSubmit={handleAdd}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="name">Name</label>
                  <input className="input w-full border-gray-300" type="text" name="name" id="name" placeholder="Enter product name" required />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="image">Image</label>
                  <input className="input w-full border-gray-300" type="text" name="image" id="image" placeholder="Enter product image URL" required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="type">Type</label>
                  <select className="select w-full border-gray-300" name="type" id="type" required>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Camera">Camera</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="category">Brand Name</label>
                  <select className="select w-full border-gray-300" name="category" id="category" required>
                    {
                      data?.data?.map(category => <option key={category?.name} value={category?.name}>{category?.name}</option>)
                    }
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="price">Price (Taka)</label>
                  <input className="input w-full border-gray-300" type="number" name="price" id="price" placeholder="Enter product price" required />
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="rating">Rating (Out of 5)</label>
                  <input className="input w-full border-gray-300" type="number" step='0.1' name="rating" id="rating" placeholder="Enter product rating" required />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2" htmlFor="short-description">Short Description</label>
                <textarea className="textarea resize-none w-full border-gray-300 leading-normal text-base h-[120px]" name="short-description" id="short-description" placeholder="Write short description of this product" required></textarea>
              </div>
              <input className="btn btn-primary btn-block" type="submit" value="Add Product" />
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddProduct;