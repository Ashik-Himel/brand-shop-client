import iPhone15ProMax from '../assets/images/iphone-15-pro-max.png';

const HomeBanner = () => {
  return (
    <section className='mt-20 py-12 bg-black text-white'>
      <div className="container">
        <div className='flex flex-col md:flex-row [&>*]:flex-1 justify-center items-center gap-8 text-center'>
          <div>
            <h1 className='text-4xl lg:text-6xl mb-6 lg:mb-10'>Coming Soon !!!</h1>
            <h4 className='text-2xl lg:text-3xl mb-2 lg:mb-4'>iPhone 15 Series</h4>
            <p className='text-gray-200 mb-6 max-w-[500px] mx-auto'>We are going to sell iPhone 15 series soon. You can subscribe us for latest update about 15 series!</p>
            <button className='btn bg-white text-base'>Subscribe</button>
          </div>
          <div>
            <img className='w-full max-w-[350px] mx-auto' src={iPhone15ProMax} alt="iPhone 15 Pro Max" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;