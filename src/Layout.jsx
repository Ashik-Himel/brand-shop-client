import {Outlet} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import { useContext } from 'react';
import { UserContext } from './ContextProvider';

const Layout = () => {
  const {darkTheme} = useContext(UserContext);

  return (
    <div data-theme={darkTheme ? "dark" : "light"} className={darkTheme ? "dark": ""}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;