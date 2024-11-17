import  { ReactNode, useContext } from 'react'
import { UserContext } from '../providers/UserProvider';
import { Navigate } from 'react-router-dom';

const ProtecRoutes = ({children}: {children: ReactNode}) => {
    const {user} = useContext(UserContext);
  return (
    <div>
        {user.name ? children : <Navigate to="/login" />}
    </div>
  )
}

export default ProtecRoutes
