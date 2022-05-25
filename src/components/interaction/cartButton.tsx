import { CSSProperties, FC } from "react"
import { Product } from "../../data/products"
import { colors } from "../../data/color"
import Button from '@mui/material/Button';


interface Props {
    /* product: Product */
    /* addToCart: (product: Product) => void */ 
}


const CartButton: FC<Props> = (props) => {
    
    return (
        <>
            <Button sx={buttonStyle} variant="outlined">Beställ</Button>
        </>
        
    )
}

export const buttonStyle: CSSProperties = {
    width: "120px",
    height: "45px",
    margin: "5px",
    color: colors.fourth,
    borderColor: colors.fourth,
}

export default CartButton