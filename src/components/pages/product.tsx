import { padding } from "@mui/system";
import { CSSProperties, FC } from "react"
import { useParams, Navigate, Link } from "react-router-dom";
import { colors } from "../../data/color";
import { Product, products } from "../../data/products";
import { Lines } from "../common/lines";
import CartButton from '../interaction/cartButton';
import CustomizedTables from "../product/compareProduct";

interface Props {
    
}


const ProductPage: FC<Props> = (props) => {

    const { productId } = useParams()

    const foundProduct = products.find((product) => Number(productId) == product.id)

    console.log(foundProduct, "foundProduct")

    if (!foundProduct) {
        return <Navigate to="/" />
    }

    console.log(foundProduct.including.length)
    return (
        <>
            <div style={{ ...container, color: colors.textWhite }}>
                <div style={{ ...row, backgroundColor: colors.primary }}>

                    <div style={productIncludeCard}>
                        {amountOfLinesByLenght(foundProduct)}
                        <div style={{}}>
                            <h1>{foundProduct.name}</h1>
                            <h2>{foundProduct.desc}</h2>
                        </div>

                        {foundProduct.including.map((include) => {

                            return (
                                <div key={include!.id} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                                    <h2>{include?.name}</h2>
                                    <h3>(Ord.pris {include?.price} kr/mån)</h3>
                                </div>

                            )
                        })}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div >
                                <h4 style={{ margin: "0" }}>Från</h4>
                                <div style={{ display: "flex" }}>
                                    <h1 style={{ margin: "0" }}>{foundProduct.price3mth} </h1>
                                    <h4>kr/mån</h4>

                                </div>
                            </div>

                            <CartButton product={foundProduct} />


                        </div>
                    </div>
                </div>
                <div style={row}>
                    <img style={imgCover} src={foundProduct!.thumbnail} alt="" />
                </div>

            </div>
            {/*  change to a own component */}
            <div style={{ ...container, flexDirection: "column" }}>

                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Lines firstColor={colors.secondary} secondColor={colors.third} />
                    <h1 style={{ fontSize: "60px", color: colors.primary, textAlign: "center" }}>Vad som ingår</h1>
                </div>

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
            {/*  change to a own component */}
            <div style={{ ...container, flexDirection: "column", color: "black" }}>

                {CustomizedTables()}
            </div>
        </>
    )
}






function amountOfLinesByLenght(foundProduct: Product) {

    if (foundProduct.including.length < 3) {
        return <Lines firstColor={colors.secondary} />
    } if (foundProduct.including.length < 4) {
        return <Lines firstColor={colors.secondary} secondColor={colors.third} />
    } if (foundProduct.including.length < 5) {
        return <Lines firstColor={colors.secondary} secondColor={colors.third} thirdColor={colors.fourth} />
    } else {
        return <h1>Something went wrong..</h1>
    }
}



const container: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
}

const row: CSSProperties = {
    width: "50%",

}

const includesInfoCard: CSSProperties = {
    width: "100%",
    margin: "4em 0",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap"

}

const productIncludeCard: CSSProperties = {
    padding: "0 5%"
}

const imgCover: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover"
}



export default ProductPage