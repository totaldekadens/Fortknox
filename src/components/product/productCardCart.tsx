import { colors } from "../../data/color"
import { FC, useContext } from "react"
import { cartContext } from "../context/cartProvider";
import CartOption from "./cartOptions";
import CartSelectedItem from "./cartSelectedItem";
import { Link } from "react-router-dom";


interface Props {}

const ProductCardCart: FC<Props> = (props) => {
    const { cartItem } = useContext(cartContext)
    
    if(cartItem){
        return (
            <>
                <CartSelectedItem />
                <CartOption cartSelected={cartItem!.id}/>
            </>
        )          
    } else {
        return (
            <>
                <div style={{width: "100vw", height: "50vh", color: colors.primary}}>
                    <h1 style={{fontSize:"1.8em"}}>Din varukorg är tom</h1>
                    <p >Gå tillbaka till <Link style={{color: colors.secondary}} to={"/"}>startsidan</Link></p>
                </div>
                
            </>
        )
    }
}

export default ProductCardCart