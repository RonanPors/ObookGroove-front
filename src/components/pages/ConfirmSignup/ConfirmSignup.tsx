import { useParams } from 'react-router-dom';
import './ConfirmSignup.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { confirmSignUp } from '../../../store/reducers/userReducer';

export default function ConfirmSignup() {
  const { authSuccess } = useAppSelector((store) => store.user);
  const { userId, confirmToken } = useParams();
  const dispatch = useAppDispatch();

  dispatch(
    confirmSignUp({
      userId: userId ?? '',
      confirmToken: confirmToken ?? '',
    })
  );

  return <>{authSuccess && <h1>Votre compte a été activé avec succès !</h1>}</>;
}
