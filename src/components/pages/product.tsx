import { CSSProperties, FC } from "react"
import { useParams, Navigate, Link } from "react-router-dom";
import { colors } from "../../data/color";
import { products } from "../../data/products";
import ContentTitle from "../common/contentTitle";
import ProductsCompare from "../product/compareProduct";
import ProductBanner from "../product/productBanner";
import ProductIncludeCard from "../product/productIncludeCard";

interface Props {

}


const ProductPage: FC<Props> = (props) => {

    const { productId } = useParams()

    const foundProduct = products.find((product) => Number(productId) == product.id)


    if (!foundProduct) {
        return <Navigate to="/" />
    }


    return (
        <>
            <ProductBanner />
            <ProductIncludeCard/>
            {/*  change to a own component */}
            <ContentTitle title="Jämför funktioner" textAlign="center" alignItems="center" firstColor={colors.third} secondColor={colors.secondary} />
            <div style={{ ...container, flexDirection: "column", justifyContent: "center", color: "black" }}>

            <ProductsCompare/>
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