import { Helmet } from "react-helmet-async";
import {Link} from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Brand Shop</title>
      </Helmet>
      
      <main>
        <section>
          <div className="container min-h-screen flex justify-center items-center text-center dark:text-white">
            <div>
              <span className="text-[150px] sm:text-[200px] font-bold text-primary leading-none block mb-4">404</span>
              <h2 className="text-3xl font-medium mb-2">Page Not Found!</h2>
              <p className="max-w-[600px] mx-auto text-gray-500 mb-6">Oops! The page you&apos;re looking for seems to have taken a detour. Please check the URL or navigate back home.</p>
              <Link to="/" className="btn btn-primary" onClick={() => scrollTo(0, 0)}>Return Home</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ErrorPage;