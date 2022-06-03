import { FC } from "react"
import Navbar from "./common/navbar"
import ContentContainer from "./contentContainer"
import Footer from "./common/footer"
import ScrollToTop from "./common/scrollToTop"
import ProductListProvider from "./context/provider"
import CartProvider from "./context/cartProvider"


const Layout: FC = () => {
  return (
      <div>
        <ProductListProvider>
          <CartProvider>
            <ScrollToTop />
            <Navbar />
            <ContentContainer />
            <Footer />
          </CartProvider>
        </ProductListProvider>
      </div>
  )
}



export default Layout