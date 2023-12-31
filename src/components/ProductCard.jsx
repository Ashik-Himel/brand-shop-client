import PropTypes from 'prop-types';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ProductCard = ({product}) => {
  const {name, slug, image, type, category, rating, price} = product;
  const ratingTrack = [];
  for(let i = 1; i <= 5; i++) {
    if (i <= Math.round(rating)) ratingTrack.push(i);
    else ratingTrack.push(-i);
  }

  return (
    <div className='bg-primary bg-opacity-10 dark:bg-gray-800 dark:text-white rounded-lg p-6 flex flex-col sm:flex-row justify-center items-start sm:items-center gap-6 [&>*]:flex-1'>
      <div className='sm:p-6'>
        <img className='w-full max-w-[200px]' src={image} alt={name} />
      </div>
      <div>
        <h3 className='text-2xl font-medium mb-3'>{name}</h3>
        <span className='block text-gray-500 dark:text-gray-400 mb-1'><span className='text-black dark:text-white font-medium'>Type:</span> {type}</span>
        <span className='block text-gray-500 dark:text-gray-400 mb-1'><span className='text-black dark:text-white font-medium'>Brand Name:</span> {category}</span>
        <div className='flex gap-1 text-orange-500 mb-2'>
          {
            ratingTrack.map(item => item > 0 ? <BsStarFill key={item} /> : <BsStar key={item} />)
          }
        </div>
        <span className='block text-gray-500 dark:text-gray-400 text-xl mb-4'><span className='text-black dark:text-white font-medium'>Price:</span> {Number(price).toLocaleString("en-US")} Taka</span>
        <div className='flex flex-wrap items-center gap-4'>
          <Link to={`/products/${slug}`} className='btn btn-primary' onClick={() => scrollTo(0, 0)}>Details</Link>
          <Link to={`/update/${slug}`} className='btn btn-secondary' onClick={() => scrollTo(0, 0)}>Update</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.object
}