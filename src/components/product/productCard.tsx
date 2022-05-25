import { Link } from 'react-router-dom';
import { FC } from "react"
import { Product } from '../../data/products'
import Button from '@mui/material/Button';
import { CSSProperties } from 'react';
import { colors } from "../../data/color";
import CartButton, { buttonStyle } from '../interaction/cartButton';



interface Props {
    product: Product
}

const ProductCard: FC<Props> = (props) => {

    /* console.log(props.product.including) */

    return (

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
                <CartButton /* product={props.product} *//>
                <Link style={{textDecoration: "none"}} to={`/${props.product.id}`}>
                    <Button sx={buttonStyle} variant="outlined">Mer info</Button>
                </Link>
            </div>
        </div>
    )
}


const cardCont: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "29%",
    backgroundColor: colors.secondary,
    height: "300px",
    borderRadius: "10px",
    padding: "20px"
}

const includeStyle: CSSProperties = {
    padding: "5px",
}



export default ProductCard