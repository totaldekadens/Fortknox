import { CSSProperties, FC, useContext } from "react"
import CheckIcon from '@mui/icons-material/Check';
import { colors } from "../../data/color";
import { flexColumn } from "../../style/common";
import { productContext } from "../context/provider";




interface Props {
    cartSelected: number
}

const CartOption: FC<Props> = (props) => {
 
    const { productList } = useContext(productContext)
    let items = productList
    if(items){
        
        let test = items.map((item) => {
            if(props.cartSelected != item.id){

                return ( 
                <div key={item.id} style={{ ...cartProductContainer }}>
        
                    <div style={{ ...cartItemInfo, ...flexColumn, backgroundColor: colors.secondary }}>
                        <h2 style={{ color: colors.fourth }}>{item.name}</h2>
        
                        <h4 style={cartItemPropertiesHeader}>Inkluderade moduler:</h4>
                        
                        {
                            
                            item.including.map((includes) => {
                                if(includes){
                                    
                                    if (includes.name == "Integration") {
                                        return (
                                            <div key={includes.id} style={cartItemPropertiesContainer}>
                                                <div style={cartItemInfoContainer}>
                                                    <CheckIcon style={{ color: "lightgreen" }} />
                                                    <p key={includes.name} style={cartItemProperties}>{includes.name}</p>
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
                                    else  {
                                        return (
                                            <div key={includes.id} style={cartItemPropertiesContainer}>
                                                <div style={cartItemInfoContainer}>
                                                    <p key={includes.name} style={{ ...cartItemProperties, marginLeft: "24px" }}>{includes.name}</p>
                                                </div>
                                                <div style={cartItemInfoContainer}>
                                                    <p style={cartItemProperties}>{includes.price} kr/mån</p>
                                                </div>
            
                                            </div>
                                        )
                                    }
                                }
                            })
                        }
                    </div>
                </div>
                )
            }
        })
        return ( <div>{test}</div>)
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