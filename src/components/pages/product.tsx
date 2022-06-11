import { CSSProperties, FC, useContext } from "react"
import { useParams, Navigate, Link } from "react-router-dom";
import { colors } from "../../data/color";
import { products } from "../../data/products";
import ContentTitle from "../common/contentTitle";
import { productContext } from "../context/productListProvider";
import { DeviceContext } from "../context/mediaQueryProvider";
import ProductsCompare from "../product/compareProduct";
import ProductBanner from "../product/productBanner";
import ProductIncludeCard from "../product/productIncludeCard";

interface Props {

}


const ProductPage: FC<Props> = (props) => {
    
    const { devices } = useContext(DeviceContext)

    const { productId } = useParams()

    // Gets productContext
    const { productList } = useContext(productContext)

    const foundProduct = productList.find((product) => Number(productId) == product.id)

    if (!foundProduct) {
        return <Navigate to="/" />
    }


    return (
        <>
            <ProductBanner />
            <ProductIncludeCard/>
            {/*  change to a own component */}
            {devices.isMobile ? undefined : <ContentTitle title="Jämför funktioner" textAlign="center" alignItems="center" firstColor={colors.third} secondColor={colors.secondary} /> } 
            <div style={{ ...container, flexDirection: "column", justifyContent: "center", color: "black" }}>
                {devices.isMobile ? undefined : <ProductsCompare/> }                
            </div>
        </>
    )
}

const container: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
}




export default ProductPage