import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { UserContext } from "../ContextProvider";
import CartCard from "../components/CartCard";

const MyCart = () => {
  const {user} = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState([]);
  const email = user?.email;

  useEffect(() => {
    fetch(`https://brand-shop-server.vercel.app/users/${email}`)
      .then(res => res.json())
      .then(data => {
        setCartProducts(data.userCart);
        console.log(data.userCart);
      })
  }, [email])

  return (
    <main className="py-12 min-h-[calc(100vh-396px)]">
      <Helmet>
        <title>My Cart - Brand Shop</title>
      </Helmet>
      
      <section>
        <div className="container">
          <h2 className="text-3xl font-medium text-center mb-8">My Cart</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {
              cartProducts?.map(product => <CartCard key={product[0]} slug={product[0]} quantity={product[1]} />)
            }
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyCart;