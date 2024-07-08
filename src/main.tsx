// lié à React :
import React from 'react';
import ReactDOM from 'react-dom/client';

// lié au routeur :
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './router';

// lié au store :
import store from './store/store';

// lié au CSS :
import 'semantic-ui-css/semantic.min.css';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// le rendu dans le DOM, avec redux qui encadre le routeur :
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
