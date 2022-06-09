import { FC } from "react"
import Navbar from "./common/navbar"
import ContentContainer from "./contentContainer"
import Footer from "./common/footer"
import ScrollToTop from "./common/scrollToTop"
import ProductListProvider from "./context/productListProvider"
import DeviceProvider from "./context/deliveryProvider"
import InvoiceInfoProvider from "./context/invoiceProvider"
import CartProvider from "./context/cartProvider"
import DeliveryProvider from "./context/deliveryProvider"


const Layout: FC = () => {
  return (
      <div>
        <InvoiceInfoProvider>
          <DeviceProvider >
            <ProductListProvider>
              <CartProvider>
                <DeliveryProvider>
                  <ScrollToTop />
                  <Navbar />
                  <ContentContainer />
                  <Footer />
                </DeliveryProvider>
              </CartProvider>
            </ProductListProvider>
          </DeviceProvider>
        </InvoiceInfoProvider>
      </div>
  )
}

export default Layout