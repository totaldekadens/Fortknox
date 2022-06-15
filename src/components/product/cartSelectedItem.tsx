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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props { }

const CartSelectedItem: FC<Props> = (props) => {

    const { cartItem, setCartItem } = useContext(cartContext)

    if (cartItem?.including) {

        let item: CartProduct = { ...cartItem }

        function increment(id: number) {

            let foundInclude = item.including.find((ele) => Number(id) == ele.include!.id)

            if (foundInclude) {
                foundInclude.qty = foundInclude.qty + 1
            }

            setCartItem(item)
        }

        function decrement(id: number) {
            const foundInclude = item.including!.find((ele) => Number(id) == ele.include!.id)
            if (foundInclude!.qty > 1) {
                foundInclude!.qty = foundInclude!.qty - 1
                setCartItem(item)
            }

        }

        const removeCart = () => {
            setCartItem(undefined)
            localStorage.removeItem("cartItem")
        }

        return (

            <div key={item.id} style={{ ...cartProductContainer }}>

                <div style={{ ...cartItemInfo, ...flexColumn, /* backgroundColor: colors.primary */}}>
                        <h1 style={{ }}>Valt paket</h1>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div style={{ display:"flex", alignItems:"center", gap: "5px"}}>
                            <h2 style={{ }}>{item.name}</h2>
                            <img style={{height: "2em"}} src={item.icon}/>
                        </div>

                        <div style={{cursor: "pointer"}} onClick={() => { removeCart() }}>
                            <DeleteForeverIcon />
                        </div>
                    </div>
                    <h4 style={cartItemPropertiesHeader}>Hur många användare ska ha åtkomst till respektive program?</h4>

                    <div>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                        <span></span>
                        <h4 style={{width:"80px", textAlign:"center", margin:"0px"}}>Antal</h4>
                        </div>
                        {

                            item.including!.map((includes) => {
                                if (includes.include) {

                                    if (includes.include.name == "Integration") {
                                        return (
                                            <div key={includes.include.id} style={cartItemPropertiesContainer}>
                                                <div style={cartItemInfoContainer}>
                                                    <p key={includes.include.name} style={{...cartItemProperties, textAlign: "center"}}>- {includes.include.name}</p>
                                                </div>
                                                <div style={priceQuantityContainer}>
                                                    <h4 style={{ ...cartItemProperties, width:"80px", textAlign:"center" }}>{includes.qty}</h4>
                                                </div>
                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div key={includes.include.id} style={cartItemPropertiesContainer}>
                                                <div style={cartItemInfoContainer}>
                                                    <p key={includes.include.name} style={{ ...cartItemProperties}}>- {includes.include.name}</p>
                                                </div>
                                                <div style={cartItemInfoContainer}>
                                                    <p style={cartItemProperties}>{includes.include.price} kr/mån</p>
                                                </div>
                                                <div style={{display:"flex", alignItems:"center", width:"80px"}}>
                                                    { includes.qty == 1 ? <RemoveIcon  style={{color: colors.bgCart}} onClick={() => decrement(includes.include!.id)} /> : <RemoveIcon  style={{cursor:"pointer"}} onClick={() => decrement(includes.include!.id)} />}
                                                    <h4 key={includes.qty} style={{width:"30px",height:"30px",borderRadius: "5px", margin: "0px 5px",  backgroundColor:"white",display:"flex", alignItems:"center",textAlign:"center", justifyContent:"center", border:"solid black 1px"}}>{includes.qty}</h4>

                                                    <AddIcon style={{cursor:"pointer"}} onClick={() => increment(includes.include!.id)} />

                                                </div>

                                            </div>
                                        )
                                    }
                                }
                            })
                        }
                    </div>
                    <hr style={{width:"100%"}}/>
                    <div>
                        <h3>Avtalsperiod</h3>
                        <h4>12 / månader</h4>
                        <h5>Abonnemanget och bindningstiden förnyas automatiskt efter varje period. Uppsägningar ska vara Fortknox tillhanda senast 30 dagar innan nästkommande period påbörjats.</h5>
                    </div>
                </div>
            </div>
        )
    } else {
        return <h1>CartItem existerer ej</h1>
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
    color: colors.primary,
    /* color: "white", */
    display: "flex",
    justifyContent: "space-between",
    

}

const cartItemInfo: CSSProperties = {
    width: "100%",
    borderRadius: "10px",
    
}

const cartItemInfoContainer: CSSProperties = {
    width: "150px",
    height: "60px",
    display: "flex",
    alignItems: "center"
}

const cartItemPropertiesHeader: CSSProperties = {
    margin: "0 0 10px",
}

const cartItemPropertiesContainer: CSSProperties = {
    display: "flex",
    height: "60px",
    justifyContent: "space-between",
    

}

const cartItemProperties: CSSProperties = {
    margin: "0",
}

const priceQuantityContainer: CSSProperties = {
    display: "flex",
    gap: "3px",
    alignItems: "center",
}

