import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

export default function Bookers (){
  const dispatch = useAppDispatch();
  const { pseudo } = useAppSelector(
    (store) => store.user.userData
  );

  return (
    <>
    <h1>Bienvenue O'BG {pseudo} !</h1>
  </>
  );
}

