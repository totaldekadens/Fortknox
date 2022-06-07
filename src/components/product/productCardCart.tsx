import { colors } from "../../data/color"
import { CSSProperties, FC, useContext, useState } from "react"
import { Product, products } from "../../data/products";
import { flexColumn } from '../../style/common'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import SectionCartContainer from "../common/sectionCartContainer";
import { cartContext } from "../context/cartProvider";
import { productContext } from "../context/provider";
import { borderRadius } from "@mui/system";
import React from "react";
import { render } from "react-dom";


interface Props {
    name:Product
    value:number
}

interface cartId{
    id:Product["id"]
}


const ProductCardCart: FC<Props> = (props) => {
    const { cartItem, getCart } = useContext(cartContext)
    // Gets productContext
    const { productList, getProductList } = useContext(productContext)
    const cartList = []
  
    
    let cartId = cartItem[0].id
    
    cartList.push( cartItem[0])

    
    productList.forEach((product)=>{
        if(cartId != product.id){
            cartList.push(product)
        }
    })
    
 
    return (
        <SectionCartContainer>
            <div style={{ ...cartContainer, ...flexColumn }}>
                {cartList.map((product,index) => {
                   
                   
                   return (

                        <div key={product.id}  style={{...cartProductContainer}}>

                            <div style={ index === 0 ?{ ...cartItemInfo, ...flexColumn, backgroundColor: colors.third }: {...cartItemInfo}  }>
                                <h2 style={{ color: colors.fourth }}>{product.name}</h2>

                                <h4 style={cartItemPropertiesHeader}>Inkluderade moduler:</h4>
                                {
                                    product.including.map((includes) => {
                                        
                                        if (includes?.name == "Integration") {
                                            return (
                                                <div key={includes?.id} style={cartItemPropertiesContainer}>
                                                    <div style={cartItemInfoContainer}>
                                                        <CheckIcon style={{ color: "lightgreen" }} />
                                                        <p key={includes!.name} style={cartItemProperties}>{includes!.name}</p>
                                                    </div>
                                                    <div style={cartItemInfoContainer}>
                                                        <p style={cartItemProperties}>Inkluderat</p>
                                                    </div>
                                                    <div style={priceQuantityContainer}>
                                                        <p style={{ ...cartItemProperties, marginRight: "27px" }}>1</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div key={includes?.id} style={cartItemPropertiesContainer}>
                                                <div style={cartItemInfoContainer}>
                                                    <p key={includes!.name} style={{ ...cartItemProperties, marginLeft: "24px" }}>{includes!.name}</p>
                                                </div>
                                                <div style={cartItemInfoContainer}>
                                                    <p style={cartItemProperties}>{includes!.price} kr/mån</p>
                                                </div>
                                                <div style={priceQuantityContainer}>
                                                    {/* <Quantity /> */}
                                                    <RemoveIcon />
                                                    <p style={cartItemProperties}>3</p>
                                                    <AddIcon />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </SectionCartContainer>
    )
}

function quantity(){
    
}
/* 
class Quantity extends React.Component {
    
    constructor(props) {
      super(props);
      
      this.state = {value: 1}
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
    }
    
    increment() {
      this.setState(prevState => {value: ++prevState});
    }
    
    decrement() {
      this.setState(prevState => {value: prevState > 0? --prevState : 0});
    }
    
    render() {
      
      return (
        
        <div className="quantity-input">
          <button className="quantity-input__modifier quantity-input__modifier--left" onClick={this.decrement}>
            &mdash;
          </button>
          <input className="quantity-input__screen" type="text" value={this.state.value} readOnly />
          <button className="quantity-input__modifier quantity-input__modifier--right" onClick={this.increment}>
            &#xff0b;
          </button>  
        </div>  
        
      );
    }
  }
  
 */


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
