import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './Library.scss';

export default function Library() {
  const { isLogged } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: 'USER/IS_LOGGED' });
  }, [dispatch]);

  return (
    <>
      {isLogged && <p>is logged</p>}
      <p>En cours de construction !</p>
    </>
  );
}
