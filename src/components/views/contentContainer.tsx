import { FC } from "react"
import { Route, Routes } from "react-router-dom";
import CheckOut from "./pages/checkOut";
import FrontPage from "./pages/front";
import ProductPage from "./pages/product";

interface Props {}


const ContentContainer: FC<Props> = (props) => {


    return (
        <>
            <Routes>
                <Route path="/" element={ <FrontPage /> } />
                <Route path="/:productId" element={ <ProductPage /> } />
                <Route path="/checkout" element={ <CheckOut /> } />
            </Routes>
        </>
    )

  }
  
  
  
  export default ContentContainer