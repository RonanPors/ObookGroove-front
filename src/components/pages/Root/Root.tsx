import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Header from '../../elements/Header/Header';
import Footer from '../../elements/Footer/Footer';

export default function Root() {
  // on récupère l'URL pour surveiller lorsqu'elle change
  const { pathname } = useLocation();

  useEffect(() => {
    // on va déclencher le scroll à chaque changement de "page" => chaque changement d'url
    window.scrollTo(0, 0);
  }, [pathname]);

  // this file is a layout for the application. We put the elements statics (header and footer) and the "outlet" display the dynamic part for each page.
  return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
