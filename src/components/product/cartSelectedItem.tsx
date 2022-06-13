import { CSSProperties, FC, useContext, useEffect, useState } from "react"
import { cartContext } from "../context/cartProvider"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import React from "react";
import { colors } from "../../data/color";
import { flexColumn } from "../../style/common";
import { DepartureBoardSharp } from "@mui/icons-material";
import { CartProduct } from "../../data/products";

interface Props {}

const CartSelectedItem: FC<Props> = (props) => {

    const { cartItem, setCartItem } = useContext(cartContext)
    
    if(cartItem?.including) {

        let item:CartProduct = {...cartItem}

            function increment(id: number) {
            
                let foundInclude = item.including.find((ele) => Number(id) == ele.include!.id)

                if(foundInclude) {
                    foundInclude.qty = foundInclude.qty + 1
                }
                
                setCartItem(item)
            }
        
            function decrement(id: number) {
                const foundInclude = item.including!.find((ele) => Number(id) == ele.include!.id)
                if(foundInclude!.qty > 1){
                    foundInclude!.qty = foundInclude!.qty - 1
                    setCartItem(item)

                }
                
            }

            return (
    
                <div key={item.id} style={{ ...cartProductContainer }}>
    
                    <div style={{ ...cartItemInfo, ...flexColumn, backgroundColor: colors.primary }}>
                        <h2 style={{ color: colors.fourth }}>{item.name}</h2>
    
                        <h4 style={cartItemPropertiesHeader}>Inkluderade moduler:</h4>
    
                        {
    
                            item.including!.map((includes) => {
                                if (includes.include) {
    
                                    if (includes.include.name == "Integration") {
                                        return (
                                            <div key={includes.include.id} style={cartItemPropertiesContainer}>
                                                <div style={cartItemInfoContainer}>
                                                    <CheckIcon style={{ color: "lightgreen" }} />
                                                    <p key={includes.include.name} style={cartItemProperties}>{includes.include.name}</p>
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
                                    else {
                                        return (
                                            <div key={includes.include.id} style={cartItemPropertiesContainer}>
                                                <div style={cartItemInfoContainer}>
                                                    <p key={includes.include.name} style={{ ...cartItemProperties, marginLeft: "24px" }}>{includes.include.name}</p>
                                                </div>
                                                <div style={cartItemInfoContainer}>
                                                    <p style={cartItemProperties}>{includes.include.price} kr/mån</p>
                                                </div>
                                                {/*                                             <div style={{height: "100%", width:"100%", backgroundColor:"orange"}} onClick={() => increment(includes.include!.id )}></div>
                                                    */}
                                                <RemoveIcon onClick={() => decrement(includes.include!.id)} />
                                                <h4 key={includes.qty}>{includes.qty}</h4>
    
                                                <AddIcon onClick={() => increment(includes.include!.id)} />

                                            </div>
                                        )
                                    }
                                }
                            })
                        }
                    </div>
                </div>
            )
    } else {
        return <h1>CartItem existerer ej</h1>
    }
}


class Quantity extends React.Component<{}, { value: number, }>  {

    constructor(props: Props) {
        super(props);

        this.state = {
            value: 1,

        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {

        this.setState({ value: this.state.value + 1 });

    }

    decrement() {

        this.setState({ value: this.state.value > 1 ? this.state.value - 1 : 1 });



    }

    render() {

        return (
            <div >
                <p style={{ textAlign: "center" }}>
                    Antal
                </p>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >

                    <RemoveIcon onClick={this.decrement}>
                        &mdash;
                    </RemoveIcon>
                    <input style={{ textAlign: "center", backgroundColor: "transparent", border: "none", color: "white" }} type="text" value={this.state.value} readOnly />
                    <AddIcon onClick={this.increment}>
                        &#xff0b;
                    </AddIcon>
                </div>
            </div>
        );
    }
}





export default CartSelectedItem



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

