import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="min-h-[500px] flex justify-center items-center text-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">Welcome to <span className="text-primary">Brand Shop</span></h1>
        <p className="max-w-[600px] mx-auto mb-6">Brand Shop is a renowned gadgets and accessories shop in Dhaka, Bangladesh. We sell  quality products with a competitive price.</p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Link className="btn btn-primary">About Us</Link>
          <Link className="btn btn-outline !border-white !text-white hover:!border-primary">Our Products</Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;