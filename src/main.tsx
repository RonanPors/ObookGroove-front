import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';
import Root from './components/pages/Root/Root.tsx';
import Bookers from './components/pages/Bookers/Bookers';
import CGU from './components/pages/CGU/CGU';
import Error from './components/pages/Error/Error';
import Landing from './components/pages/Landing/Landing';
import LegalNotice from './components/pages/LegalNotice/LegalNotice';
import Library from './components/pages/Library/Library';
import Login from './components/pages/Login/Login';
import Profile from './components/pages/Profile/Profile';
import SignUp from'./components/pages/SignUp/SignUp';


import 'semantic-ui-css/semantic.min.css';
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />} errorElement={<Error />}>
    <Route index element={ <Landing /> } />
    <Route path='/member/books' element={ <Bookers /> } />
    <Route path='/member/library' element={ <Library /> } />
    <Route path='/member/profile' element={ <Profile /> } />
    <Route path='/CGU' element={ <CGU /> } />
    <Route path='/legal-notice' element={ <LegalNotice /> } />
    <Route path='/signin' element={ <Login /> } />
    <Route path='/signup' element={ <SignUp /> } />
  </Route>
))

root.render(
  <RouterProvider router={ router } />
)

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

