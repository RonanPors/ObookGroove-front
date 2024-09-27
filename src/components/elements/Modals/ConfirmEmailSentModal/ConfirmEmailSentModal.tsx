import { Modal } from 'semantic-ui-react';
import './ConfirmEmailSentModal.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { resetEmailSent } from '../../../../store/reducers/userReducer';

export default function ConfirmEmailSentModal() {
  const { emailSent } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  return (
    <Modal
      size="mini"
      open={emailSent !== ''}
      header="Confirmation d'inscription"
      content={`Pour finaliser votre inscription, veuillez la valider depuis l'email que nous avons envoyé à l'adresse suivante : ${emailSent}`}
      actions={[
        { key: 'OK', content: 'OK', onClick: () => dispatch(resetEmailSent()) },
      ]}
    />
  );
}
