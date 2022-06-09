import TextField from "@mui/material/TextField";
import { FC } from "react";
import { colors } from "../../data/color";
import SectionCartContainer from "../common/sectionCartContainer";
import { inputData } from "../interaction/inputFieldsCart";
import ProductCardCart from "../product/productCardCart";
import RenderPaymentOptions from "./paymentOptions";




interface Props {}





const CartSummary: FC<Props> = (props) => {

    const textFieldColor = "white";
    const textFieldSX = {
        input: {
            "WebkitTextFillColor": `${textFieldColor} !important`,
            color: `${textFieldColor} !important`,
        },
    };


    return (

        <SectionCartContainer>

            <ProductCardCart />

            <div>
                <h2 style={{color: colors.fourth}}>Dina uppgifter:</h2>
                
                {inputData.map((input) => {

                    return (
                        <div key= {input.label} style={{display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent:"space-between"}}>
                            <h4 style={{minWidth:"210px"}}>{input.label}:</h4>
                            <TextField 
                            hiddenLabel
                            id="filled-hidden-label-small"
                            defaultValue={input.name}
                            variant="filled"
                            size="small"
                            disabled
                            sx={textFieldSX}
                            style={{minWidth: "200px"}}
                            />
                        </div>
                    )
                })}

            </div>

            <div>
                <h2 style={{color: colors.fourth}}>Betalning:</h2>

                <RenderPaymentOptions />

            </div>



        </SectionCartContainer>




    )



}


export default CartSummary;