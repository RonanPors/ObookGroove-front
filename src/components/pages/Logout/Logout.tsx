import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logoutTotal } from '../../../store/reducers/userReducer';
import { persistor } from '../../../store/store';

export default function Logout() {
  const dispatch = useAppDispatch();
  const logoutStatus = useAppSelector((state) => state.user.logoutStatus);

  useEffect(() => {
    const performLogout = async () => {
      // Exécutez l'action de déconnexion
      await dispatch(logoutTotal());
      console.log('Avant purge, localStorage:', localStorage);
      // Purge le persistor après la déconnexion
      await persistor.purge();

      // Effacez également localStorage (si nécessaire)
      localStorage.clear();
      console.log('Après purge, localStorage:', localStorage);
    };

    performLogout();
  }, [dispatch]);

  return logoutStatus ? <Navigate to="/signin" /> : null;
}
