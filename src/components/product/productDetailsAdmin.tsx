import { FC, CSSProperties, useContext } from "react"
import { Product } from '../../data/products'
import { colors } from "../../data/color";
import { DeviceContext } from "../context/mediaQueryProvider";
import { DeviceContextData } from "../context/mediaQueryProvider";
import { productContext } from "../context/productListProvider";
import * as React from 'react';
import DialogWindow from "../interaction/dialogs";
import DeleteButton from "../interaction/deleteButton";

interface Props {
    product: Product
}

const ProductDetailsAdmin: FC<Props> = (props) => {

    // Gets product context
    const { deleteProduct, productList } = useContext(productContext)
    const { devices } = useContext(DeviceContext)

    // AlertDialog
    const [open, setOpen] = React.useState(false);

    const handleClose = (answer: boolean) => {
        setOpen(false);
        answer ? deleteProduct(props.product) : undefined
    };

    return (
        <div style={container}>
            <div style={cardCont}>
                <strong style={fontSizeMobileStrong({devices: devices})}>{"Id: " + props.product.id}</strong>
                <h1>{props.product.name}</h1>
                <div style= {{marginBottom: "20px"}}>
                    <strong style={fontSizeMobileStrong({devices: devices})}>{"Ikon: "}</strong><img style={{width: "50px", height: "50px", objectFit: "contain"}} src= {props.product.icon} alt="" /> 
                    <strong style={{ ...fontSizeMobileStrong({devices: devices}), marginLeft: "10px"}}>{"Bild: "}</strong><img style={{width: "90px", height: "50px", objectFit: "contain"}} src= {props.product.thumbnail} alt="" /> 
                </div>
                <strong style={fontSizeMobile({devices: devices})}>Inkluderade produkter:</strong>
                <div>
                    {props.product.including.map((include) => { return (<p style={{...fontSizeMobile({devices: devices}), margin: "0px"}} key={include!.id} >{include?.name} {`(Ordinarie pris: ${include?.price} kr/mån)`} </p>) })}
                </div><br />
                <strong style={fontSizeMobile({devices: devices})}>Beskrivning:</strong>
                <span style={fontSizeMobile({devices: devices})}>{props.product.desc}</span><br />
                <div style={{ display: "flex", height: "100%", justifyContent: "space-between" }}>
                    <div>
                        <strong style={fontSizeMobile({devices: devices})}>Priser:</strong><br />
                        <span style={fontSizeMobile({devices: devices})}>3 månader - </span>
                        <span style={{ fontSize: "25px" }}>{props.product.price3mth}</span><span style={fontSizeMobile({devices: devices})}> kr/mån</span><br />
                        <span style={fontSizeMobile({devices: devices})}>12 månader - </span>
                        <span style={{ fontSize: "25px" }}>{props.product.price12mth}</span><span style={fontSizeMobile({devices: devices})}> kr/mån</span>
                    </div>
                    
                </div>
                <DeleteButton setOpen={setOpen} />
            </div>
            < DialogWindow  handleClose={handleClose} product={props.product} open={open}/>
        </div>
    )
}

const container: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "20px",
}

const cardCont: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.secondary,
    height: "auto",
    borderRadius: "10px",
    padding: "20px"
}

const fontSizeMobile: (devices: DeviceContextData) => CSSProperties = (devices) =>  {
    
    return {
        fontSize: devices.devices.isMobile ? "11px" : ""
    }
}

const fontSizeMobileStrong: (devices: DeviceContextData) => CSSProperties = (devices) =>  {
    
    return {
        fontSize: devices.devices.isMobile ? "14px" : ""
    }
}

export default ProductDetailsAdmin