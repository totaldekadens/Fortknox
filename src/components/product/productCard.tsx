import { FC, CSSProperties, useContext } from "react"
import { Product } from '../../data/products'
import { colors } from "../../data/color";
import CartButton from '../interaction/cartButton';
import ProductButton from '../interaction/toProductButton';
import { DeviceContext, DeviceContextData } from "../context/provider";



interface Props {
    product: Product
}

const ProductCard: FC<Props> = (props) => {

    const { devices } = useContext(DeviceContext)

    return (
        <div style={container({devices: devices})}>
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
                    <CartButton product={props.product} paddingBtn={""}/>
                    <ProductButton product={props.product}/>  
                </div>
            </div>
        </div>
    )
}


const container:(devices: DeviceContextData) => CSSProperties = (devices) =>  {

    return {
        display: "flex",
        flexDirection: "column",
        width: devices.devices.isDesktop ? "29%" : devices.devices.isTablet ? "40%" : devices.devices.isMobile ? "80%" : "",
        minWidth: "290px",
        height: "400px",
        borderRadius: "10px",
    }
}

const cardCont: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    backgroundColor: colors.secondary,
    height: "300px",
    borderRadius: "10px",
    padding: "7%"
}

const includeStyle: CSSProperties = {
    padding: "5px",
}



export default ProductCard