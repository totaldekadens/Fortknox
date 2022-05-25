import { CSSProperties, FC } from "react"
import { useParams, Navigate } from "react-router-dom";
import { colors } from "../../data/color";
import { products } from "../../data/products";
import { OneLine, ThreeLines, TwoLines } from "../common/lines";

interface Props { }


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
                    
  
                    
                    <div style={{}}>
                        <h1>{foundProduct.name}</h1>
                        <h2>{foundProduct.desc}</h2>
                    </div>

                    {foundProduct.including.map((include) => {

                        return (
                            <div key={include!.id} style={{ display: "flex", justifyContent: "space-between" }}>
                                <h2>{include?.name}</h2>
                                <h3>(Ord.pris {include?.price} kr/mån)</h3>
                            </div>

                        )
                    })}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div >
                            <h4 style={{ margin: "0" }}>Från</h4>
                            <div style={{ display: "flex" }}>
                                <h1 style={{ margin: "0" }}>{foundProduct.price3mth} </h1>
                                <h4>kr/mån</h4>

                            </div>
                        </div>
                        <div>Knapp</div>
                      
                    </div>

                </div>
                <div style={row}>
                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={foundProduct!.image} alt="" />
                </div>

            </div>
            {/*  change to a own component */}
            <div>
                <div>
                   
                    {foundProduct.including.map((include) => {
                        if (include?.name == "Bokföring") {

                            return (
                                <div key={include!.id} style={{ display: "flex" }}>
                                    <h2>{include?.name}</h2>
                                    <h3>{include?.desc}</h3>
                                </div>

                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}

/* function test(){
    if(){
        <OneLine firstColor={colors.}></OneLine>
         
    }
    if(foundProduct.id == 2){
        <TwoLines></TwoLines>
    }
    if(foundProduct.id == 3){
        <ThreeLines></ThreeLines>

    }
}   */
const container: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "60vh",
    backgroundColor: "orange"
}

const row: CSSProperties = {
    width: "50%",
    height: "100%",
    backgroundColor: "blue"
}

const dasd: CSSProperties = {
    width: "50%",
    height: "100%",
    backgroundColor: "blue"
}



export default ProductPage