import { colors } from "../../data/color"
import { CSSProperties, FC } from "react"
import { products } from "../../data/products";
import { flexColumn } from '../../style/common'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';


interface Props {}

console.log(products)

const CheckOut: FC<Props> = (props) => {
    
    return (
        <div style={{...cartContainer, ...flexColumn}}>
            <h1 style={{color: colors.primary}}>Kassa</h1>

            {products.map((product) => {
                return (

                    <div key={product.id} style={cartProductContainer}>

                        <div style={{...cartItemInfo, ...flexColumn}}>
                            <h3 style={{color: colors.fourth}}>{product.name}</h3>

                            <h4 style={cartItemPropertiesHeader}>Inkluderade moduler:</h4>
                            {
                            product.including.map((includes) => {

                                if(includes?.name == "Integration" ) {
                                    return(
                                        <div style={cartItemPropertiesContainer}>
                                            <div style={cartItemInfoContainer}>
                                                <CheckIcon style={{color: "lightgreen"}}/>
                                                <p key={includes!.name} style={cartItemProperties}>{includes!.name}</p>
                                            </div>
                                            <div style={cartItemInfoContainer}>
                                                <p style={cartItemProperties}>Inkluderat</p>
                                            </div>
                                            <div style={priceQuantityContainer}>
                                                <p style={{...cartItemProperties, marginRight: "27px"}}>1</p>
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <div style={cartItemPropertiesContainer}>
                                        <div style={cartItemInfoContainer}>
                                            <p key={includes!.name} style={{...cartItemProperties, marginLeft:"24px"}}>{includes!.name}</p>
                                        </div>
                                        <div style={cartItemInfoContainer}>
                                            <p style={cartItemProperties}>{includes!.price} kr/mån</p>
                                        </div>
                                        <div style={priceQuantityContainer}>
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
    )
}


export default CheckOut

const cartContainer: CSSProperties = {
    padding: "20px",
    minHeight: "1000px",
    alignItems: "center",
    gap: "20px",
}

const cartProductContainer: CSSProperties = {
    width: "90%",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
    backgroundColor: colors.secondary,
    borderRadius: "10px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
}

const cartItemInfo: CSSProperties = {
    width: "100%",
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
