import { FC, CSSProperties } from "react"
import { Product } from '../../data/products'
import { colors } from "../../data/color";
import Button from "@mui/material/Button";
import { buttonStyle } from "../../style/common";


interface Props {
    product: Product
}

const ProductDetailsAdmin: FC<Props> = (props) => {

    return (
        <div style={container}>
            <div>
                <img style={{width: "50px", height: "50px", objectFit: "contain"}} src= {props.product.icon} alt="" /> 
            </div>
            <div style={cardCont}>
            <h1>{props.product.name}</h1>

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
                    <div style={{display: "flex", alignItems:"flex-end"}}>
                    <Button sx={{...buttonStyle, borderColor: "red", color: "red"}} variant="outlined">Ta bort</Button>
                    <Button sx={buttonStyle} variant="outlined">Ändra</Button>
                    </div>
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