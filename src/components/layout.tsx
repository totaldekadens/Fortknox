import { FC } from "react"
import Navbar from "./common/navbar"
import ContentContainer from "./contentContainer"
import Footer from "./common/footer"
import ScrollToTop from "./common/scrollToTop"
import ProductListProvider from "./context/productListProvider"
import DeviceProvider from "./context/mediaQueryProvider"
import InvoiceInfoProvider from "./context/invoiceProvider"
import CartProvider from "./context/cartProvider"
import DeliveryProvider from "./context/deliveryProvider"
import PaymentProvider from "./context/checkOutProvider"


const Layout: FC = () => {
  return (
      <div>
        <DeviceProvider>
          <InvoiceInfoProvider>
              <ProductListProvider>
                <CartProvider>
                  <DeliveryProvider>
                    <PaymentProvider>
                      <ScrollToTop />
                      <Navbar />
                      <ContentContainer />
                      <Footer />
                    </PaymentProvider>
                  </DeliveryProvider>
                </CartProvider>
              </ProductListProvider>
          </InvoiceInfoProvider>
        </DeviceProvider>
      </div>
  )
}

export default Layout
