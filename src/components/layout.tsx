import { FC } from "react"
import Navbar from "./common/navbar"
import ContentContainer from "./contentContainer"
import Footer from "./common/footer"

 
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