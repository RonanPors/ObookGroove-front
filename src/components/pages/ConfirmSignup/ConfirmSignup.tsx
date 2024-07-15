import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ConfirmSignup.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { confirmSignUp } from '../../../store/reducers/userReducer';

export default function ConfirmSignup() {
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

  // action pour la fonction asynchrone confirmSignUp
  const { userId, confirmToken } = useParams();
  const count = useRef(0);
  useEffect(() => {
    if (count.current === 0) {
      count.current += 1;
      dispatch(
        confirmSignUp({
          userId: userId ?? '',
          confirmToken: confirmToken ?? '',
        })
      );
    }
  }, [userId, confirmToken, dispatch]);

  return <h1 color="white">Confirmation en cours</h1>;
}
