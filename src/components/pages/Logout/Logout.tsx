import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logoutTotal } from '../../../store/reducers/userReducer';

export default function Logout() {
  const dispatch = useAppDispatch();
  const logoutStatus = useAppSelector((state) => state.user.logoutStatus);

  useEffect(() => {
    dispatch(logoutTotal());
  }, [dispatch]);

  return logoutStatus ? <Navigate to="/signin" /> : null;
}
