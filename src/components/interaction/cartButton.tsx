import { FC, useContext, useState } from "react"
import { Product, products } from "../../data/products"
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import { buttonStyle } from "../../style/common";
import { productContext } from "../context/provider";
import { cartContext } from "../context/cartProvider";


interface Props {
    product: Product
    paddingBtn: string
}


const CartButton: FC<Props> = (props) => {
   
    const { productList } = useContext(productContext)
    const { cartItem, getCart } = useContext(cartContext)
    
    
    
    
    
    const saveProductToLocalstorage = () => {
        
        const foundProduct = productList.find((product) => Number(props.product.id) == product.id)
        
        const cartList = []
        cartList.push(foundProduct)
        
        localStorage.setItem("cartItem", JSON.stringify(cartList))
        getCart()    
    }
    return (
        <Link style={{ textDecoration: "none" }} to={`/checkout/${props.product.id}`} >
            <Button sx={{...buttonStyle, padding: props.paddingBtn }} variant="outlined" onClick={() => { saveProductToLocalstorage() }}>Beställ</Button>
        </Link>
    )
}

export default CartButton