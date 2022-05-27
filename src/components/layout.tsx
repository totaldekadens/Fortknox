import { FC } from "react"
import Navbar from "./common/navbar"
import ContentContainer from "./contentContainer"
import Footer from "./common/footer"
import ScrollToTop from "./common/scrollToTop"


const Layout: FC = () => {
  return (
      <div>
          <ScrollToTop />
          <Navbar />
          <ContentContainer />
          <Footer />
      </div>
  )
}



export default Layout