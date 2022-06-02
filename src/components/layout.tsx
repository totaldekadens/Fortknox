import { FC } from "react"
import Navbar from "./common/navbar"
import ContentContainer from "./contentContainer"
import Footer from "./common/footer"
import ScrollToTop from "./common/scrollToTop"
import ProductListProvider from "./context/provider"


const Layout: FC = () => {
  return (
      <div>
        <ProductListProvider>
          <ScrollToTop />
          <Navbar />
          <ContentContainer />
          <Footer />
        </ProductListProvider>
      </div>
  )
}



export default Layout