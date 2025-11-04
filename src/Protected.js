import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
    isLoggedIn = localStorage.getItem('isLoggedIn')
    
if (!isLoggedIn && localStorage.getItem('nivel') !='administrador') {
return <Navigate to="/login" replace />;
}
return children;
};
export default Protected;