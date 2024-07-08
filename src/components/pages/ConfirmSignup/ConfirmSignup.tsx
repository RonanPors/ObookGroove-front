import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ConfirmSignup.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { confirmSignUp } from '../../../store/reducers/userReducer';

export default function ConfirmSignup() {
  const { userId, confirmToken } = useParams();
  const dispatch = useAppDispatch();

  // pour redirect vers la page de books en cas de succès
  const { authSuccess, error } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (authSuccess) {
      navigate('/member/books');
    }
    // TODO renvoyer vers une page 404
    if (error) {
      navigate('/');
    }
  }, [authSuccess, error, navigate]);

  dispatch(
    confirmSignUp({
      userId: userId ?? '',
      confirmToken: confirmToken ?? '',
    })
  );

  return <h1>Confirmation en cours</h1>;
}
