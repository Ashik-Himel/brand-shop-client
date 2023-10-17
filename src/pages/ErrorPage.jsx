import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Brand Shop</title>
      </Helmet>
      <h2>Error Page</h2>
    </>
  );
};

export default ErrorPage;