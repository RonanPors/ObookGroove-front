import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';

export default function ProtectedRoute() {
  // verifier dans le store si isLogged = true
  const { isLogged } = useAppSelector((store) => store.user);

  // Outlet permet de rendre les composants enfants d'une route imbriquée
  return isLogged ? <Outlet /> : <Navigate to="/signin" />;
}
