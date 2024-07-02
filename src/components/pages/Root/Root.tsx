import Header from "../../elements/Header/Header"
import Footer from "../../elements/Footer/Footer"
import { Outlet } from "react-router-dom"

export default function Root(){
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