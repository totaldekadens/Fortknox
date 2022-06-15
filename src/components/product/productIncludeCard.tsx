import { CSSProperties, FC, useContext } from "react"
import { useParams, Navigate } from "react-router-dom";
import { colors } from "../../data/color";
import ContentTitle from "../common/contentTitle";
import { productContext } from "../context/productListProvider";

interface Props {}

const ProductIncludeCard: FC<Props> = (props) => {

    const { productId } = useParams()

    // Gets productContext
    const { productList } = useContext(productContext)

    const foundProduct = productList.find((product) => Number(productId) == product.id)

    if (!foundProduct) {
        return <Navigate to="/" />
    }

    return (
        
            <div style={{ ...container, flexDirection: "column" }}>

                <ContentTitle title="Vad som ingår" centerText={true} alignItems="center" firstColor={colors.third} secondColor={colors.secondary} />

                <div style={includesInfoCard} >
                    {foundProduct.including.map((include) => {
                        return (
                            <div key={include!.id} style={{ display: "flex", flexDirection: "column", minWidth: "300px", maxWidth: "380px", margin: "0 20px" }}>
                                <h2 style={{ color: "black" }}>{include?.name}</h2>
                                <p style={{ color: "black" }}>{include?.desc}</p>
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