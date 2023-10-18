import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { FaCircleXmark } from 'react-icons/fa6';

const Navbar = () => {
  const [drawerShow, setDrawerShow] = useState(false);

  return (
    <nav className="py-4 flex justify-between items-center gap-4 font-medium">
      <Link className="flex items-center gap-2" to='/' onClick={() => scrollTo(0, 0)}>
        <img className="w-10" src="/favicon.png" alt="Brand Icon" />
        <span className="block text-3xl">Brand Shop</span>
      </Link>

      <ul className="flex flex-col sm:flex-row justify-center items-center gap-6 fixed top-0 bottom-0 -right-full sm:static w-4/5 max-w-[350px] sm:w-auto sm:max-w-none bg-white sm:bg-[transparent] text-black sm:text-white text-[18px] sm:text-base transition-[right] sm:transition-none z-10" style={drawerShow ? {right: '0'} : {}}>
        <FaCircleXmark className="sm:hidden absolute top-6 left-6 text-3xl text-primary cursor-pointer" onClick={() => setDrawerShow(!drawerShow)} />
        <li>
          <NavLink to='/' className={({isActive}) => isActive ? 'font-bold border-b-2 text-primary border-primary' : ''} onClick={() => setDrawerShow(!drawerShow)}>Home</NavLink>
        </li>
        <li>
          <NavLink to='/add' className={({isActive}) => isActive ? 'font-bold border-b-2 text-primary border-primary' : ''} onClick={() => setDrawerShow(!drawerShow)}>Add Product</NavLink>
        </li>
        <li>
          <NavLink to='/cart' className={({isActive}) => isActive ? 'font-bold border-b-2 text-primary border-primary' : ''} onClick={() => setDrawerShow(!drawerShow)}>My Cart</NavLink>
        </li>
        <li>
          <NavLink to='/login' className={({isActive}) => isActive ? 'font-bold border-b-2 text-primary border-primary btn btn-primary' : 'btn btn-primary'} onClick={() => setDrawerShow(!drawerShow)}>Login</NavLink>
        </li>
      </ul>

      <div className="sm:hidden border px-4 py-3 rounded-md text-[18px] cursor-pointer" onClick={() => setDrawerShow(!drawerShow)}>
        <AiOutlineMenu />
      </div>
    </nav>
  );
};

export default Navbar;