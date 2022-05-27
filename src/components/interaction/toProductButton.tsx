import { FC } from "react"
import { Product } from "../../data/products"
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { buttonStyle } from "../../style/common";


interface Props {
    product: Product
}


const ProductButton: FC<Props> = (props) => {
    
    return (
        <Link style={{textDecoration: "none"}} to={`/${props.product.id}`}>
            <Button sx={buttonStyle} variant="outlined">Mer info</Button>
        </Link>
    )
}

export default ProductButton