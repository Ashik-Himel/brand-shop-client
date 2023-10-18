import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const CartCard = ({slug, quantity}) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://brand-shop-server.vercel.app/products/${slug}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [slug]);

  return (
    <div className="bg-primary bg-opacity-10 p-6 rounded-lg flex [&>*]:flex-1 flex-col sm:flex-row justify-center items-center gap-6">
      <div>
        <img className="max-w-[200px] mx-auto" src={product?.image} alt="Product Image" />
      </div>
      <div>
        <h4 className="text-3xl font-medium mb-1">{product?.name}</h4>
        <span className="text-gray-500 block mb-6"><span className="font-medium">Quantity:</span> {quantity}</span>
        <button className="btn btn-warning">Remove</button>
      </div>
    </div>
  );
};

export default CartCard;

CartCard.propTypes = {
  slug: PropTypes.object,
  quantity: PropTypes.string
}