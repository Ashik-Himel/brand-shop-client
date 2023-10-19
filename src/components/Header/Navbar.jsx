import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { FaCircleXmark } from 'react-icons/fa6';
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { UserContext } from "../../ContextProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import toast from "react-hot-toast";

const Navbar = () => {
  const [drawerShow, setDrawerShow] = useState(false);
  const [profileShow, setProfileShow] = useState(false);
  const {loadedUser, user, darkTheme, setDarkTheme} = useContext(UserContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout Successful !!!');
      })
      .catch(error => {
        toast.error(error.code);
      })
  }

  return (
    <nav className="py-4 flex justify-between items-center gap-4">
      <Link className="flex items-center gap-2" to='/' onClick={() => scrollTo(0, 0)}>
        <img className="w-8 sm:w-10" src="/favicon.png" alt="Brand Icon" />
        <span className="block text-xl sm:text-3xl">Brand Shop</span>
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
      </ul>
      <div className="flex items-center gap-4 relative">
        {
          loadedUser ? user ? <div className="flex justify-center items-center gap-4 cursor-pointer select-none" onClick={() => setProfileShow(!profileShow)}>
            <img className="w-10 rounded-full" src={user?.photoURL} alt="User" />
            <span className="hidden lg:block">{user?.displayName?.split(" ")[0]}</span>
          </div> : <Link to='/login' className="btn btn-primary" onClick={() => scrollTo(0, 0)}>Login</Link> : <span className="loading loading-spinner px-4"></span>
        }
        <div className="sm:hidden border p-3 rounded-md cursor-pointer flex justify-center items-center" onClick={() => setDrawerShow(!drawerShow)}>
          <AiOutlineMenu />
        </div>
        {
          profileShow && <div className="bg-white text-black text-center p-4 w-[300px] absolute right-0 top-[calc(100%+15px)] rounded-lg lg:rounded-tr-none">
            <span className="w-4 h-4 bg-white absolute -top-2 right-[70px] sm:right-[12px] lg:right-[3px] rotate-45"></span>
            <img className="w-20 mx-auto rounded-full mb-2" src={user?.photoURL} alt="User" />
            <h4 className="text-[18px] font-medium">{user?.displayName}</h4>
            <span className="text-gray-500 mb-4 block">{user?.email}</span>
            <button className="btn btn-warning" onClick={() => {
              setProfileShow(!profileShow);
              handleLogout();
            }}>Logout</button>
          </div>
        }
        <div className="select-none text-2xl text-primary cursor-pointer" onClick={() => {
          setDarkTheme(!darkTheme);
          if (localStorage.getItem("darkMode") === "1") {
            localStorage.setItem("darkMode", "0");
          } else {
            localStorage.setItem("darkMode", "1");
          }
        }}>
          {
            darkTheme ? <BsFillSunFill /> : <BsFillMoonFill />
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;