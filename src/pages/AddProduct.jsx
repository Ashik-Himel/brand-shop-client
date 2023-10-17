import { Helmet } from "react-helmet-async";

const AddProduct = () => {
  return (
    <main className="my-12">
      <Helmet>
        <title>Add Product - Brand Shop</title>
      </Helmet>
      
      <section>
        <div className="container">
          <div className="bg-primary bg-opacity-10 p-6 rounded-md max-w-[900px] mx-auto">
            <h2 className="text-3xl font-medium text-center mb-6">Add New Product</h2>
            <form className="space-y-4">
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
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Camera">Camera</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-2" htmlFor="category">Category</label>
                  <select className="select w-full border-gray-300" name="category" id="category" required>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Oneplus">Oneplus</option>
                    <option value="HP">HP</option>
                    <option value="Lenevo">Lenevo</option>
                    <option value="Asus">Asus</option>
                    <option value="Canon">Canon</option>
                    <option value="Nikon">Nikon</option>
                    <option value="Sony">Sony</option>
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
                  <input className="input w-full border-gray-300" type="number" name="rating" id="rating" placeholder="Enter product rating URL" required />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2" htmlFor="short-description">Short Description</label>
                <textarea className="textarea resize-none w-full border-gray-300" name="short-description" id="short-description" placeholder="Write short description of this product" required></textarea>
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