
import { CSSProperties, FC } from "react"
import { useParams, Navigate, Link } from "react-router-dom";
import { colors } from "../../data/color";
import {  products } from "../../data/products";
import ContentTitle from "../common/contentTitle";


interface Props {

}

const ProductIncludeCard: FC<Props> = (props) => {

    const { productId } = useParams()

    const foundProduct = products.find((product) => Number(productId) == product.id)


    if (!foundProduct) {
        return <Navigate to="/" />
    }


    return (
        
            <div style={{ ...container, flexDirection: "column" }}>

                <ContentTitle title="Vad som ingår" textAlign="center" alignItems="center" firstColor={colors.third} secondColor={colors.secondary} />


                <div style={includesInfoCard} >
                    {foundProduct.including.map((include) => {
                        return (
                            <div key={include!.id} style={{ display: "flex", flexDirection: "column", minWidth: "300px", maxWidth: "380px", margin: "0 20px" }}>
                                <h2 style={{ color: "black" }}>{include?.name}</h2>
                                <h3 style={{ color: "black" }}>{include?.desc}</h3>
                            </div>
                        )
                    })}
                </div>

            </div>
            
    )
}



const container: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
}


const includesInfoCard: CSSProperties = {
    width: "100%",
    margin: "4em 0",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap"

}




export default ProductIncludeCard