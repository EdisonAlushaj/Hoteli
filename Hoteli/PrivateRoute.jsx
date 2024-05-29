import { Navigate,Outlet} from 'react-router-dom'
import cookieUtils from './src/cookieUtils';
const PrivateRoute = () => {
    const isAuthenticated = cookieUtils.getUserRoleFromCookies() === 'Admin';
    return (
        isAuthenticated ? < Outlet/> : <Navigate to='/login' />
    )
}
export default PrivateRoute;
