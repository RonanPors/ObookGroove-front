// lié au routeur :
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

// toutes les pages :
import Bookers from './components/pages/Bookers/Bookers';
import CGU from './components/pages/CGU/CGU';
import Error from './components/pages/Error/Error';
import Landing from './components/pages/Landing/Landing';
import LegalNotice from './components/pages/LegalNotice/LegalNotice';
import Library from './components/pages/Library/Library';
import NewPassword from './components/pages/NewPassword/NewPassword';
import Profile from './components/pages/Profile/Profile';
import ResetPassword from './components/pages/ResetPassword/ResetPassword';
import ConfirmSignup from './components/pages/ConfirmSignup/ConfirmSignup';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';

// fichier racine indiquant les parties "fixes" d'une page (header et footer)
import Root from './components/pages/Root/Root';

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
        path="/reset-password/:userId/:resetToken"
        element={<NewPassword />}
      />
      <Route
        path="/confirm-signup/:userId/:confirmToken"
        element={<ConfirmSignup />}
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Route>
  )
);

export default router;
