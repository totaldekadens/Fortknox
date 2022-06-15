import { FC, useContext } from "react"
import { colors } from "../../data/color";
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
                    <div key={item.id} style={{minWidth:"320px",margin:"20px", color: "white"}}>
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

export default CartOption