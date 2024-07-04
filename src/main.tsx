// lié à React :
import React from 'react';
import ReactDOM from 'react-dom/client';

// lié au routeur :
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

// lié au store :
import { Provider } from 'react-redux';
import store from './store/store';

// fichier racine indiquant les parties "fixes" d'une page (header et footer)
import Root from './components/pages/Root/Root';

// toutes les pages :
import Bookers from './components/pages/Bookers/Bookers';
import CGU from './components/pages/CGU/CGU';
import Error from './components/pages/Error/Error';
import Landing from './components/pages/Landing/Landing';
import LegalNotice from './components/pages/LegalNotice/LegalNotice';
import Library from './components/pages/Library/Library';
import Profile from './components/pages/Profile/Profile';
import ResetPassword from './components/pages/ResetPassword/ResetPassword';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';

// lié au CSS :
import 'semantic-ui-css/semantic.min.css';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route index element={<Landing />} />
      <Route path="/member/books" element={<Bookers />} />
      <Route path="/member/library" element={<Library />} />
      <Route path="/member/profile" element={<Profile />} />
      <Route path="/general-conditions-use" element={<CGU />} />
      <Route path="/legal-notice" element={<LegalNotice />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/reset-password/:userId([0-9]+)/:resetToken"
        element={<ResetPassword />}
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Route>
  )
);

// le rendu dans le DOM, avec redux qui encadre le routeur :
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
