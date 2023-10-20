import PropTypes from 'prop-types';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const HomeCard = ({product}) => {
  const {image, name, price, rating, slug} = product;
  const ratingTrack = [];
  const roundRating = Math.round(rating);
  for (let i = 1; i <= 5; i++) {
    if (i <= roundRating) ratingTrack.push(i);
    else ratingTrack.push(-i);
  }

  return (
    <div className='bg-primary bg-opacity-10 dark:bg-gray-900 dark:text-white p-6 rounded-lg'>
      <div className='mb-6'>
        <img className='w-full max-w-[200px]' src={image} alt={name} />
      </div>
      <h2 className='text-2xl mb-2'>{name}</h2>
      <div className='flex gap-1 text-orange-500 mb-2'>
        {
          ratingTrack.map(item => item > 0 ? <BsStarFill key={item} /> : <BsStar key={item} />)
        }
      </div>
      <span className='block text-[18px] font-semibold mb-4'>{Number(price).toLocaleString()} Taka</span>
      <Link className='btn btn-primary' to={`/products/${slug}`} onClick={() => scrollTo(0, 0)}>View Details</Link>
    </div>
  );
};

export default HomeCard;

HomeCard.propTypes = {
  product: PropTypes.object
}