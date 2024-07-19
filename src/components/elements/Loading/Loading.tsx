import { Loader } from 'semantic-ui-react';
import './Loading.scss';

export default function Loading() {
  return (
    <Loader active inline="centered" size="medium" inverted>
      Patientez, nous traitons votre demande ...
    </Loader>
  );
}
