import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedInRedux = useSelector(state => state.loginReducer.isLoggedIn);
  const isLoggedInStorage = localStorage.getItem('isLoggedIn') === 'true';

  const isAuthenticated = isLoggedInRedux || isLoggedInStorage;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
