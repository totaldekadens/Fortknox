import { CSSProperties, FC, useContext } from "react"
import CheckIcon from '@mui/icons-material/Check';
import { colors } from "../../data/color";
import { flexColumn } from "../../style/common";
import { productContext } from "../context/productListProvider";
import ProductCard from "./productCard";




interface Props {
    cartSelected: number
}

const CartOption: FC<Props> = (props) => {
 
    const { productList } = useContext(productContext)
    let items = productList
    if(items){
        
        let products = items.map((item) => {
            if(props.cartSelected != item.id){

                return ( 
                    <div style={{minWidth:"320px",margin:"20px", color: "white"}}>
                        <ProductCard key={item.id} product={item} />

                    </div>
                    
                
                )
            }
        })
        return ( 
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center", color: colors.primary}}>
            <hr style={{width:"100%"}}/>
            <h1>Våra andra paket</h1>
            <div style={{display:"flex",flexWrap:"wrap", justifyContent:"center"}}>
                {products}
            </div>
        </div>
        )

    }else{
        return <h1>CartSelectedItem row 78</h1>
    }

}










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

export default CartOption