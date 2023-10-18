import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const handleSubscribe = e => {
    e.preventDefault();

    const newSubscriber = {subscriber: e.target.subscribe.value};

    fetch('https://brand-shop-server.vercel.app/subscribers', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newSubscriber)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success('Subscribed Successfully !!!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          e.target.reset();
        }
      })
      .catch(error => {
        toast.error(error.code, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
  }

  return (
    <footer className='bg-primary bg-opacity-10 pt-12'>
      <div className="container">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <img className='w-10' src="/favicon.png" alt="Brand Shop" />
              <span className='block text-3xl font-medium'>Brand Shop</span>
            </div>
            <p className='mb-4'><span className='font-bold'>Our Location:</span> Yakub Ali Master Tower (3rd floor), Mawna Chourasta, Sreepur, Gazipur-1740, Dhaka, Bangladesh.</p>
            <div className='flex items-center gap-6 text-3xl text-primary'>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><BsFacebook /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><BsInstagram /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><BsTwitter /></a>
            </div>
          </div>
          <div>
            <h4 className='text-3xl font-medium mb-4'>Pages</h4>
            <div className='inline-flex flex-col gap-2'>
              <Link to='/' onClick={() => scrollTo(0, 0)}>Home</Link>
              <Link to='/add' onClick={() => scrollTo(0, 0)}>Add Product</Link>
              <Link to='/cart' onClick={() => scrollTo(0, 0)}>My Cart</Link>
              <Link to='/login' onClick={() => scrollTo(0, 0)}>Login</Link>
            </div>
          </div>
          <div>
            <h4 className='text-3xl font-medium mb-4'>Subscribe Us</h4>
            <form onSubmit={handleSubscribe}>
              <input className='input w-full max-w-[500px] border-gray-300 mb-4' type="email" name="subscribe" id="subscribe" placeholder='Enter email address' required />
              <div>
                <input className='btn btn-primary' type="submit" value="Subscribe" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='text-center py-4 mt-12 bg-primary text-white'>
        <div className='container'>
          <p>Copyright &copy; {new Date().getFullYear()} - Brand Shop. All rights reserved. Developed by <a className='font-bold' href="https://www.facebook.com/ashikujjaman.himel" target="_blank" rel="noopener noreferrer">Ashik-Himel</a></p>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </footer>
  );
};

export default Footer;