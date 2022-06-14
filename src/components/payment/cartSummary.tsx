import TextField from "@mui/material/TextField";
import { FC, useContext } from "react";
import { colors } from "../../data/color";
import SectionCartContainer from "../common/sectionCartContainer";
import ProductCardCart from "../product/productCardCart";
import RenderPaymentOptions from "./paymentOptions";
import { invoiceContext } from "../context/invoiceProvider";
import CartSelectedItem from "../product/cartSelectedItem";


interface Props {}


const CartSummary: FC<Props> = (props) => {


    const { getInputData, setInputData } = useContext(invoiceContext)

    const textFieldColor = "white";
    const textFieldSX = {
        input: {
            "WebkitTextFillColor": `${textFieldColor} !important`,
            color: `${textFieldColor} !important`,
        },
    };

    // Checks if the input is empty.
    const removeEmptyFields = getInputData.filter((input) => input.value != "");

    return (

        <SectionCartContainer>
            <div>
                <h2 style={{color: colors.primary}}>Betalning:</h2>

                <RenderPaymentOptions />

            </div>
            
            <div>
                <h2 style={{color: colors.primary}}>Dina uppgifter:</h2>
                
                {removeEmptyFields.map((input) => {

                    return (
                        <div key= {input.label} style={{display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent:"space-between"}}>
                            <h4 style={{minWidth:"210px"}}>{input.label}:</h4>
                            <TextField 
                            hiddenLabel
                            id="filled-hidden-label-small"
                            defaultValue={input.value}
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

            

        </SectionCartContainer>
    )
}


export default CartSummary;