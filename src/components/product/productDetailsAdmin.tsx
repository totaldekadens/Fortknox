import { FC, CSSProperties } from "react"
import { Product } from '../../data/products'
import { colors } from "../../data/color";
import Button from "@mui/material/Button";
import { buttonStyle } from "../../style/common";
import AddProduct from "../admin/addProduct";
import { TabPanel } from "../admin/adminTemplatePart";



interface Props {
    product: Product
    deleteProductProp: (product: Product) => void;
}

const ProductDetailsAdmin: FC<Props> = (props) => {

    return (
        <div style={container}>
            <div style={cardCont}>
            <strong>{"Id: " + props.product.id}</strong>
            <h1>{props.product.name}</h1>
            <div style= {{marginBottom: "20px"}}>
                <strong   >{"Ikon: "}</strong><img style={{width: "50px", height: "50px", objectFit: "contain"}} src= {props.product.icon} alt="" /> 
                <strong style={{ marginLeft: "10px"}}>{"Bild: "}</strong><img style={{width: "90px", height: "50px", objectFit: "contain"}} src= {props.product.thumbnail} alt="" /> 
            </div>
            <strong>Inkluderade produkter:</strong>
                <div>
                    {props.product.including.map((include) => { return (<p style={{margin: "0px"}} key={include!.id} >{include?.name} {`(Ordinarie pris: ${include?.price} kr/mån)`} </p>) })}
                </div><br />
                <strong>Beskrivning:</strong>
                <span>{props.product.desc}</span><br />
                <div style={{ display: "flex", height: "100%", justifyContent: "space-between" }}>
                    <div>
                        <strong>Priser:</strong><br />
                        <span>3 månader - </span>
                        <span style={{ fontSize: "25px" }}>{props.product.price3mth}</span><span> kr/mån</span><br />
                        <span>12 månader - </span>
                        <span style={{ fontSize: "25px" }}>{props.product.price12mth}</span><span> kr/mån</span>
                    </div>
                    
                </div>
                <div style={{display: "flex", alignItems:"flex-end", justifyContent: "flex-end" , width: "100%", marginTop: "10px"}}>
                    <Button onClick={(e) => {props.deleteProductProp(props.product)} } sx={{...buttonStyle, borderColor: "red", color: "red"}} variant="outlined">Ta bort</Button>
                    <Button sx={buttonStyle} variant="outlined">Ändra</Button>
                </div>
            </div>
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



export default ProductDetailsAdmin