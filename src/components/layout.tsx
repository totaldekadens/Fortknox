import { FC } from "react"
import Navbar from "./navbar"
import ContentContainer from "./views/contentContainer"
import Footer from "./footer"

 
const Layout: FC = () => {
  return (
      <div>
          <Navbar />
          <ContentContainer />
          <Footer />
      </div>
  )
}



export default Layout