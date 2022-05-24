/* navigationItem.tsx  */

import { Link } from 'react-router-dom';
import { FC } from "react"
import { Product } from '../../data/products'
import Button from '@mui/material/Button';
import { CSSProperties } from '@mui/styled-engine';
import { colors } from "./../../data/color";
import { borderRadius } from '@mui/system';


interface Props {
    product: Product
}

const NavigationProduct: FC<Props> = (props) => {

    console.log(props.product.including)
    
    return (

        <div style={cardCont}>
            <div>
                {props.product.including.map((include) => { return (<span style={includeStyle}>{include?.name}, </span>)  })}
            </div>
            <div style={{display: "flex", height: "100%"}}>
                <div>
                    <h1>{props.product.name}</h1>  
                    <span>Från</span><br />
                    <span style={{fontSize:"25px"}}>{props.product.price12mth}</span><span> kr/mån</span> 
                </div>
            </div>
            <div>
            <Button style={buttonStyle} variant="outlined">Beställ</Button>
            <Link style={{textDecoration: "none"}} to={`/${props.product.id}`}>
                <Button style={buttonStyle} variant="outlined">Mer info</Button>
            </Link>
            </div>
        </div>
    )
}


const cardCont : CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "29%",
    backgroundColor: colors.secondary,
    height: "300px",
    borderRadius: "10px",
    padding: "20px"
}



const includeStyle : CSSProperties = {
    padding: "5px",
}

const buttonStyle : CSSProperties = {
    width: "120px",
    height: "45px",
    margin: "5px",
    color: colors.fourth,
    borderColor: colors.fourth,
}


export default NavigationProduct