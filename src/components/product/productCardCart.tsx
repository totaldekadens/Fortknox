import { colors } from "../../data/color"
import { CSSProperties, FC, useContext, useState } from "react"
import { Product, products } from "../../data/products";
import { flexColumn } from '../../style/common'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import SectionCartContainer from "../common/sectionCartContainer";
import { cartContext } from "../context/cartProvider";
import { productContext } from "../context/productListProvider";
import { borderRadius } from "@mui/system";
import React from "react";
import { render } from "react-dom";
import CartOption from "./cartOptions";
import CartSelectedItem from "./cartSelectedItem";


interface Props {}

const ProductCardCart: FC<Props> = (props) => {
    const { cartItem } = useContext(cartContext)
    
    if(cartItem){
        return (
            <SectionCartContainer>
                <CartSelectedItem />
                <CartOption cartSelected={cartItem!.id}/>
            </SectionCartContainer>
        )          
    } else {
        return (
            <SectionCartContainer>
                <h1>Cartitem existerer ej</h1>
            </SectionCartContainer>
        )
    }
}








export default ProductCardCart



const cartContainer: CSSProperties = {
    width: "100%",
    alignItems: "center",
    gap: "20px",

}

const cartProductContainer: CSSProperties = {
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "space-between",

}

const cartItemInfo: CSSProperties = {
    width: "100%",
    padding: "20px",
    borderRadius: "10px"
}

const cartItemInfoContainer: CSSProperties = {
    width: "150px",
    display: "flex",
    alignItems: "center"
}

const cartItemPropertiesHeader: CSSProperties = {
    margin: "0 0 10px",
}

const cartItemPropertiesContainer: CSSProperties = {
    display: "flex",
    marginBottom: "5px",
    paddingBottom: "1px",
    justifyContent: "space-between",
    borderBottom: "3px solid white",

}

const cartItemProperties: CSSProperties = {
    margin: "0",
}

const priceQuantityContainer: CSSProperties = {
    display: "flex",
    gap: "3px",
    alignItems: "center",
}
