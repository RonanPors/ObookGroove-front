import { Outlet, useLocation } from "react-router-dom"

import Header from "../../elements/Header/Header"
import Footer from "../../elements/Footer/Footer"

import { useEffect } from "react"
// this file is a layout for the application. We put the elements statics and the "outlet" display the dynamic part for each page.

export default function Root(){

  // on récupère l'URL pour surveiller lorsqu'elle change
  const { pathname } = useLocation()

  useEffect(() => {
    // on va délcencher le scroll à chaque changement de "page" => chaque changement d'url
    window.scrollTo(0, 0)
  }, [pathname])

return (
<>
  <Header />

    <main className="main">
      <Outlet />
    </main>
  
  <Footer />
</>
)
}