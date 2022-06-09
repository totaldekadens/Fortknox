import { FC } from "react"
import Navbar from "./common/navbar"
import ContentContainer from "./contentContainer"
import Footer from "./common/footer"
import ScrollToTop from "./common/scrollToTop"
import ProductListProvider, { DeviceProvider, InvoiceInfoProvider } from "./context/provider"
import CartProvider from "./context/cartProvider"


const Layout: FC = () => {
  return (
      <div>
        <InvoiceInfoProvider>
          <DeviceProvider >
            <ProductListProvider>
              <CartProvider>
                <ScrollToTop />
                <Navbar />
                <ContentContainer />
                <Footer />
              </CartProvider>
            </ProductListProvider>
          </DeviceProvider>
        </InvoiceInfoProvider>
      </div>
  )
}

export default Layout