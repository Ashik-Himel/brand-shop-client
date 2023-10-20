import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { UserContext } from "../ContextProvider";
import CartCard from "../components/CartCard";

const MyCart = () => {
  const {user} = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    fetch(`https://brand-shop-server.vercel.app/usersCart/${user?.uid}`)
      .then(res => res.json())
      .then(data => setCartProducts(data))
  }, [user]);

  return (
    <main className="py-12 min-h-[calc(100vh-396px)]">
      <Helmet>
        <title>My Cart - Brand Shop</title>
      </Helmet>
      
      {
        cartProducts.length !== 0 ? <section>
          <div className="container">
            <h2 className="text-3xl font-medium text-center mb-8 dark:text-white">My Cart</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {
                cartProducts?.map(product => <CartCard key={product._id} product={product} cartProducts={cartProducts} setCartProducts={setCartProducts} />)
              }
            </div>
          </div>
        </section> : <section>
          <div className="container">
            <img className="w-32 mx-auto" src="/favicon.png" alt="Icon" />
            <h2 className="text-3xl font-medium mt-4 text-center">Your cart is empty !!!</h2>
          </div>
        </section>
      }
    </main>
  );
};

export default MyCart;