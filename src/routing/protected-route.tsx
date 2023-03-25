import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { ProtectionRouteType } from '../interfases';

export const ProtectedRoute = ({ children }: ProtectionRouteType) => {
  const token = Cookies.get('jwt');

  if (!token) {
    return <Navigate to='/auth' replace={true} />;
  }

  return children;
};
