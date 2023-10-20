import PropTypes from 'prop-types';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../ContextProvider';

const CartCard = ({product, cartProducts, setCartProducts}) => {
  const {user} = useContext(UserContext);
  const {name, slug, image, quantity, subTotal} = product;

  const handleProductRemove = () => {
    Swal.fire({
      title: 'Warning !!!',
      text: "Are you sure to remove this product?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://brand-shop-server.vercel.app/usersCart/${user?.uid}/${slug}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(() => {
            const newCartProducts = cartProducts.filter(item => item._id !== product._id);
            setCartProducts(newCartProducts);
            Swal.fire(
              'Removed !!!',
              'Product has been removed from the cart!',
              'success'
            )
          })
      }
    })
  }

  return (
    <div className="bg-primary bg-opacity-10 dark:bg-gray-900 dark:text-white p-6 rounded-lg flex [&>*]:flex-1 flex-col sm:flex-row justify-center items-start sm:items-center gap-6">
      <div>
        <img className="w-full max-w-[200px] mx-auto" src={image} alt="Product Image" />
      </div>
      <div>
        <h4 className="text-3xl font-medium mb-2">{name}</h4>
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
  product: PropTypes.object,
  cartProducts: PropTypes.array,
  setCartProducts: PropTypes.func
}