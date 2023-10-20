import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Banner from "../Banner";
import headerBg from "../../assets/images/banner.jpg";

const Header = () => {
  const {pathname} = useLocation();

  return (
    <header className="bg-[rgba(0,0,0,0.85)] bg-blend-overlay text-white" style={pathname === '/' ? {backgroundImage: `url(${headerBg})`} : {}}>
      <div className="container">
        <Navbar />
        {
          pathname === '/' && <Banner />
        }
      </div>
    </header>
  );
};

export default Header;