import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserContext } from '../ContextProvider';
import { Navigate } from 'react-router-dom';

const PrivateRouteAlt = ({children}) => {
  const {loadedUser, user} = useContext(UserContext);

  if (loadedUser) {
    if (!user) return children;
    else return <Navigate to='/' />
  }
  else return <div className="text-center py-8 text-primary">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
};

export default PrivateRouteAlt;

PrivateRouteAlt.propTypes = {
  children: PropTypes.node
}