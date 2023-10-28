import { useContext } from "react";
import { UserContext } from "../ContextProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import Loading from "../components/Loading";

const PrivateRoute = ({children}) => {
  const {loadedUser, user} = useContext(UserContext);
  const {pathname} = useLocation();

  if (loadedUser) {
    if (user) return children;
    else return <Navigate to='/login' state={{prevPath: pathname}} />
  }
  else return <Loading />
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node
}