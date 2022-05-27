import { FC } from "react"
import { Product } from "../../data/products"
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { buttonStyle } from "../../style/common";


interface Props {
    product: Product
    /* addToCart: (product: Product) => void */ 
}


const CartButton: FC<Props> = (props) => {
    
    return (
        <Link style={{textDecoration: "none"}} to={`/checkout/${props.product.id}`} >
            <Button sx={buttonStyle} variant="outlined">Beställ</Button>
        </Link>
    )
}

export default CartButton