import { useState } from 'react';
import {
  Button,
  Image,
  Modal,
  ModalContent,
  ModalDescription,
} from 'semantic-ui-react';
import './BookDetailsModal.scss';
import img from '../../../../assets/logo/svg/logo4_vertbleu.svg';

export default function BookDetailsModal() {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      className="book-details__modal"
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Show Modal</Button>}
    >
      <ModalContent
        image
        className="book-details__content book-details__content1"
      >
        <Image className="book-details__img" size="small" src={img} wrapped />
        <ModalDescription className="book-details__infos">
          <h2>Titre</h2>
          <h3 className="h4">Auteur</h3>
          <p>
            <b>Date de publication</b> : AAAA
          </p>
          <p>
            <b>Genre</b> : Genre
          </p>
          <p>
            <b>Nombre de pages</b> : NNN
          </p>
          <p>
            <b>ISBN</b> : ISBN
          </p>
        </ModalDescription>
      </ModalContent>
      <ModalContent className="book-details__resume">
        <p>Résumé du livre :</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia fuga
        aspernatur sit eum, est optio veniam magnam iusto quis beatae placeat
        magni nobis sed accusamus. Ipsam dolorum odit natus magni? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Quia fuga aspernatur sit
        eum, est optio veniam magnam iusto quis beatae placeat magni nobis sed
        accusamus. Ipsam dolorum odit natus magni?
      </ModalContent>
      {/* <ModalActions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </ModalActions> */}
    </Modal>
  );
}
