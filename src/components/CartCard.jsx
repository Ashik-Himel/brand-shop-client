import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const CartCard = ({item}) => {
  const [slug, quantity, subTotal] = item;

  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://brand-shop-server.vercel.app/products/${slug}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [slug]);

  const handleProductRemove = () => {
    
  }

  return (
    <div className="bg-primary bg-opacity-10 dark:bg-secondary dark:bg-opacity-10 dark:text-white p-6 rounded-lg flex [&>*]:flex-1 flex-col sm:flex-row justify-center items-center gap-6">
      <div>
        <img className="max-w-[200px] mx-auto" src={product?.image} alt="Product Image" />
      </div>
      <div>
        <h4 className="text-3xl font-medium mb-2">{product?.name}</h4>
        <div className=" mb-6">
          <span className="text-gray-500 block dark:text-gray-300"><span className="font-medium">Quantity:</span> {quantity}</span>
          <span className="text-gray-500 block dark:text-gray-300"><span className="font-medium">Subtotal:</span> {Number(subTotal).toLocaleString()} Taka</span>
        </div>
        <button className="btn btn-warning" onClick={handleProductRemove}>Remove</button>
      </div>
    </div>
  );
};

export default CartCard;

CartCard.propTypes = {
  item: PropTypes.array
}