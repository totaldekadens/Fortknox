import { FC } from "react"
import Navbar from "./common/navbar"
import ContentContainer from "./contentContainer"
import Footer from "./common/footer"
import ScrollToTop from "./common/scrollToTop"
import Provider from "./context/provider"


const Layout: FC = () => {
  return (
      <div>
        <Provider>
          <ScrollToTop />
          <Navbar />
          <ContentContainer />
          <Footer />
        </Provider>
      </div>
  )
}



export default Layout