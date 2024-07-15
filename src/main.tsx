// lié à React :
import React from 'react';
import ReactDOM from 'react-dom/client';

// lié au persist :
import { PersistGate } from 'redux-persist/integration/react';

// lié à GraphQL :
import { ApolloProvider } from '@apollo/client';

// lié au routeur :
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './router';

// le client de GraphQL :
import { apolloClient } from './lib/gql/queries';

// lié au store :
import store, { persistor } from './store/store';

// lié au CSS :
import 'semantic-ui-css/semantic.min.css';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// le rendu dans le DOM, avec redux qui encadre le routeur :
root.render(
 
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  
);
