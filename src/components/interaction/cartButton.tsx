import { FC, useContext, useState } from "react"
import { CartProduct, Includ, Product } from "../../data/products"
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import { buttonStyle } from "../../style/common";
import { productContext } from "../context/productListProvider";
import { cartContext } from "../context/cartProvider";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SvgIcon from "@mui/icons-material/AddShoppingCart";


interface Props {
    product: Product
    paddingBtn: string
}


const CartButton: FC<Props> = (props) => {

    const { productList } = useContext(productContext)
    const { cartItem, setCartItem } = useContext(cartContext)
    
    const saveProductToLocalstorage = () => {
        
        const foundProduct = productList.find((product) => Number(props.product.id) == product.id)
        
        if(foundProduct) {
            const cartList:CartProduct = {
                id: foundProduct.id,
                name: foundProduct.name,
                desc: foundProduct.desc,
                icon: foundProduct.icon,
                price3mth: foundProduct.price3mth,
                price12mth: foundProduct.price12mth,
                including:[] 
            }

            foundProduct?.including.map((include) => {
    
                const newIncludeObj : Includ = {
                    include: include,
                    qty: 1
                }
                cartList.including.push(newIncludeObj)
                })
                /* cartList.push(foundProduct) */
                setCartItem(cartList)
                localStorage.setItem("cartItem", JSON.stringify(cartList))

        } else {
            return <h1>Ingen produkt hittades</h1>
        }
    }   
    
    return (
        <Link style={{ textDecoration: "none" }} to={`/checkout/`} >
            <Button sx={{...buttonStyle, padding: props.paddingBtn }} variant="outlined" onClick={() => { saveProductToLocalstorage() }}><SvgIcon>< AddShoppingCartIcon /></SvgIcon></Button>
        </Link>
        )
}

export default CartButton