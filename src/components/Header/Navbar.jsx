import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-4 flex justify-between items-center gap-4 font-medium">
      <Link className="flex items-center gap-2" to='/' onClick={() => scrollTo(0, 0)}>
        <img className="w-10" src="/favicon.png" alt="Brand Icon" />
        <span className="block text-3xl">Brand Shop</span>
      </Link>

      <ul className="flex items-center gap-6">
        <li>
          <NavLink to='/' className={({isActive}) => isActive ? 'font-bold border-b-2 text-primary border-primary' : ''}>Home</NavLink>
        </li>
        <li>
          <NavLink to='/add' className={({isActive}) => isActive ? 'font-bold border-b-2 text-primary border-primary' : ''}>Add Product</NavLink>
        </li>
        <li>
          <NavLink to='/cart' className={({isActive}) => isActive ? 'font-bold border-b-2 text-primary border-primary' : ''}>My Cart</NavLink>
        </li>
        <li>
          <NavLink to='/login' className={({isActive}) => isActive ? 'font-bold border-b-2 text-primary border-primary btn btn-primary' : 'btn btn-primary'}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;