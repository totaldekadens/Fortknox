import { CSSProperties, FC } from "react"
import { Navigate, useParams } from "react-router-dom"
import { colors } from "../../data/color"
import { Product, products } from "../../data/products"
import Lines from "../common/lines"
import CartButton from "../interaction/cartButton"

interface Props {
    
}

const ProductBanner: FC<Props> = (props) => {

    const { productId } = useParams()

    const foundProduct = products.find((product) => Number(productId) == product.id)


    if (!foundProduct) {
        return <Navigate to="/" />
    }

    
    return (
        
            <div style={{ ...container, color: colors.textWhite }}>
                <div style={{ ...row, backgroundColor: colors.primary, padding:"0px 40px 40px 40px" }}>

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
            )
}



function amountOfLinesByLenght(foundProduct: Product) {

    if (foundProduct.including.length < 3) {
        return <Lines firstColor={colors.secondary} margin= "50px 0px 0px 0px" />
    } if (foundProduct.including.length < 4) {
        return <Lines firstColor={colors.secondary} secondColor={colors.third} margin= "50px 0px 0px 0px" />
    } if (foundProduct.including.length < 5) {
        return <Lines firstColor={colors.secondary} secondColor={colors.third} thirdColor={colors.fourth} margin= "50px 0px 0px 0px" />
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

const productIncludeCard: CSSProperties = {
    padding: "0 5%"
}

const imgCover: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover"
}

export default ProductBanner