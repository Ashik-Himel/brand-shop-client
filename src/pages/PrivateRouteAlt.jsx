import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserContext } from '../ContextProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';

const PrivateRouteAlt = ({children}) => {
  const {loadedUser, user, prevPath} = useContext(UserContext);

  if (loadedUser) {
    if (!user) return children;
    else if (prevPath) return <Navigate to={prevPath} />
    else return <Navigate to='/' />
  }
  else return <Loading />
};

export default PrivateRouteAlt;

PrivateRouteAlt.propTypes = {
  children: PropTypes.node
}