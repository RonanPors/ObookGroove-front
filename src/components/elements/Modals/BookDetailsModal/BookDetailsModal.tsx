import {
  Image,
  Modal,
  ModalContent,
  ModalDescription,
} from 'semantic-ui-react';
import './BookDetailsModal.scss';
import placeholder from '../../../../assets/logo/svg/logo2_vertbleu.svg';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { toggleOpenModal } from '../../../../store/reducers/booksReducer';

export default function BookDetailsModal() {
  const { openModal, books, idBookModal } = useAppSelector(
    (store) => store.books
  );
  const dispatch = useAppDispatch();
  const modalBook = books.find((book) => book.id === idBookModal);

  return (
    <Modal
      className="book-details__modal"
      closeIcon
      open={openModal}
      onClose={() => dispatch(toggleOpenModal({ idBookModal: null }))}
    >
      {modalBook && (
        <>
          <ModalContent
            image
            className="book-details__content book-details__content1"
          >
            <Image
              className="book-details__img"
              size="small"
              src={modalBook.cover || placeholder}
              wrapped
            />
            <ModalDescription className="book-details__infos">
              <h2>{modalBook.title || 'titre inconnu'}</h2>
              <h3 className="h4">
                {' '}
                {(modalBook.author && modalBook.author.length > 0 && (
                  <span>
                    {modalBook.author.reduce(
                      (acc: string, item: string) => `${acc}, ${item}`
                    )}
                  </span>
                )) ||
                  'inconnu'}
              </h3>

              <p>
                <b>Date de publication</b> : {modalBook.year || 'inconnu'}
              </p>
              <p>
                <b>Genre(s)</b> :{' '}
                {(modalBook.genre && modalBook.genre.length > 0 && (
                  <span>
                    {modalBook.genre.reduce(
                      (acc: string, item: string) => `${acc}, ${item}`
                    )}
                  </span>
                )) ||
                  'inconnu'}
              </p>
              <p>
                <b>Nombre de pages</b> : {modalBook.numberOfPages || 'inconnu'}
              </p>
              <p>
                <b>ISBN</b> : {modalBook.numberOfPages || 'inconnu'}
              </p>
            </ModalDescription>
          </ModalContent>
          <ModalContent className="book-details__resume">
            <p>Résumé du livre :</p>
            {modalBook.resume || 'inconnu'}
          </ModalContent>
        </>
      )}
    </Modal>
  );
}
