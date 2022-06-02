import { colors } from "../../data/color"
import { CSSProperties, FC } from "react"
import { products } from "../../data/products";
import { flexColumn } from '../../style/common'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import SectionCartContainer from "../common/sectionCartContainer";


interface Props {

}


const ProductCardCart: FC<Props> = (props) => {
    
    return (
        <SectionCartContainer>
            <div style={{ ...cartContainer, ...flexColumn }}>
                {products.map((product) => {
                   
                   return (

                        <div key={product.id} style={cartProductContainer}>

                            <div style={{ ...cartItemInfo, ...flexColumn }}>
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
