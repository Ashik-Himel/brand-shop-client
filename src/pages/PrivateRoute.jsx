import { useContext } from "react";
import { UserContext } from "../ContextProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
  const {loadedUser, user} = useContext(UserContext);
  const {pathname} = useLocation();

  if (loadedUser) {
    if (user) return children;
    else return <Navigate to='/login' state={{prevPath: pathname}} />
  }
  else return <div className="text-center py-8 text-primary">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node
}