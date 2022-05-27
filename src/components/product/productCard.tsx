import { FC, CSSProperties } from "react"
import { Product } from '../../data/products'
import { colors } from "../../data/color";
import CartButton from '../interaction/cartButton';
import ProductButton from '../interaction/toProductButton';



interface Props {
    product: Product
}

const ProductCard: FC<Props> = (props) => {

    return (
        <div style={container}>
            <div>
                <img style={{width: "50px", height: "50px", objectFit: "contain"}} src= {props.product.icon} alt="" /> 
            </div>
            <div style={cardCont}>
                <div>
                    {props.product.including.map((include) => { return (<span key={include!.id} style={includeStyle}>{include?.name}, </span>) })}
                </div>
                <div style={{ display: "flex", height: "100%" }}>
                    <div>
                        <h1>{props.product.name}</h1>
                        <span>Från</span><br />
                        <span style={{ fontSize: "25px" }}>{props.product.price12mth}</span><span> kr/mån</span>
                    </div>
                </div>
                <div>
                    <CartButton product={props.product}/>
                    <ProductButton product={props.product}/>  
                </div>
            </div>
        </div>
    )
}


const container: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "29%",
    height: "400px",
    borderRadius: "10px",
    padding: "20px"
}

const cardCont: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: colors.secondary,
    height: "300px",
    borderRadius: "10px",
    padding: "20px"
}

const includeStyle: CSSProperties = {
    padding: "5px",
}



export default ProductCard