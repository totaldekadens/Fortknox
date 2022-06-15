import TextField from "@mui/material/TextField";
import { FC, useContext } from "react";
import { colors } from "../../data/color";
import SectionCartContainer from "../common/sectionCartContainer";
import RenderPaymentOptions from "./paymentOptions";
import { invoiceContext } from "../context/invoiceProvider";

import { btnContainer, spaceBetween } from "./summaryCard";
import { priceSummaryFunc } from "./priceLogic";
import { deliveryContext } from "../context/deliveryProvider";
import { paymentContext } from "../context/checkOutProvider";
import { cartContext } from "../context/cartProvider";
import { DeviceContext } from "../context/mediaQueryProvider";
import errorLoop from "../interaction/inputFieldsCartErrorHandler"
import { validateFields } from "../interaction/paymentOptionsErrorHandler"
import React from "react";
import OrderConfirmWindow from "../interaction/confirmation";



interface Props {
    nextFunc: () => void
    activeStep: number,
    steps: string[]

}


const CartSummary: FC<Props> = (props) => {

    const { deliveryInput, setDeliveryInput } = useContext(deliveryContext)
    const { paymentOptionState, setPaymentOptionState } = useContext(paymentContext);
    const { cartItem, setCartItem } = useContext(cartContext)
    const { devices } = useContext(DeviceContext)
    const { getInputData, setInputData } = useContext(invoiceContext)
    const [open, setOpen] = React.useState(false);
    
    const textFieldColor = colors.primary;
    const textFieldSX = {
        input: {
            "WebkitTextFillColor": `${textFieldColor} !important`,
            color: `${textFieldColor} !important`,
        },
    };

    // Checks if the input is empty.
    const removeEmptyFields = getInputData.filter((input) => input.value != "");



    //////////////////////////////////////////
    const validateNextStep = () => {


        if (props.activeStep === 0) {
            props.nextFunc()
        }
        if (props.activeStep === 1) {

            deliveryInput ? props.nextFunc() : undefined;

        }
        if (props.activeStep === 2) {

            // Fick kalla på errorloopen här sålänge för att det skulle fungera
            const result = errorLoop(getInputData)
            setInputData(result);

            // Kollar om något error state är true (dvs är fel)
            const found = result.find(e => e.errorState == true || e.required == true && e.value == "")

            // Om inga fel hittade sätt knapp till enable annars disable
            !found ? props.nextFunc() : undefined;
        }

        if (props.activeStep === 3) {

            if (paymentOptionState) {

                if (paymentOptionState.input) {

                    const result = validateFields({ ...paymentOptionState });
                    setPaymentOptionState(result)

                    // Kollar om något error state är true (dvs är fel)
                    const found = result!.input!.find(e => e.errorState == true)
                    // Om inga fel hittade sätt knapp till enable annars disable
                    !found ? setOpen(true) : undefined;

                } else {

                    /* props.nextFunc(); */
                    setOpen(true)  // skall det vara true här ? 
                }
            }



        }

    }

    const extraOrderRender = () => {
        return cartItem?.including.map(includeObj => {
            if (includeObj.qty > 1) {
                return (
                    <div key={includeObj.include.name} style={{ ...spaceBetween }}>
                        <h5 style={{ width: "33%", margin: " 0px" }}>{includeObj.include?.name}</h5>
                        <h5 style={{ width: "33%", textAlign: "center", margin: " 0px" }}>{includeObj.qty - 1} st</h5>
                        <h5 style={{ width: "33%", textAlign: "right", margin: " 0px" }}>{includeObj.include?.price} kr/mån</h5>
                    </div>
                )
            } else {
                return undefined
            }
        })

    }

    //const { getInputData, setInputData } = useContext(inputContext)
    const extraOrder = () => {
        const foundQtyChange = cartItem!.including.find((x) => 1 < x.qty)
        if (foundQtyChange) {
            return (
                <div>
                    <div style={{ ...spaceBetween }}>
                        <h4>Extra Beställning</h4>
                    </div>
                    {extraOrderRender()}
                    <hr />
                </div>
            )
        } else {
            return undefined
        }

    }
    //////////////////////////////////////////


    return (
        <>
        <SectionCartContainer>
            <div style={{ display: "flex", flexDirection: "column", color: colors.primary }}>
                <h1>Slutför köp</h1>
                <div  style={{ width: "100%" }}>

                    <h2>Ditt Paket</h2>

                    <div style={{ ...spaceBetween }}>
                        <h5 style={{ margin: "0" }}>{cartItem?.name}</h5>
                        <h5 style={{ margin: "0" }}>{cartItem?.price12mth} kr/mån</h5>
                    </div>

                    {extraOrder()}

                    <h2>Summering</h2>
                    <div style={{ ...spaceBetween }}>
                        <h5 style={{ margin: "0" }}>Avtalsperiod</h5>
                        <h5 style={{ margin: "0" }}>12/mån</h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h5 style={{ margin: "0" }}>Ditt Paket</h5>
                        <h5 style={{ margin: "0" }}>{priceSummaryFunc("ex.month")} kr</h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h5 style={{ margin: "0" }}>Moms</h5>
                        <h5 style={{ margin: "0" }}>{priceSummaryFunc("moms.month")} kr</h5>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3>Abonnemang</h3>
                        <h3>{priceSummaryFunc("inc.month")} kr/mån</h3>
                    </div>

                    <h5 style={{ marginTop: "0px" }}>* När paketet är klart för leverans så börjar abonnemangskostnaden.</h5>

                    <div style={{ display: "flex", flexDirection: "column", backgroundColor: "white", padding: "0 20px", borderRadius: "10px" }}>

                        <div style={{ ...spaceBetween }}>
                            <h5 style={{ marginBottom: "0px"}}>{deliveryInput!.title}</h5>
                            <h5 style={{ marginBottom: "0px"}}>{priceSummaryFunc("ex.delivery")} kr</h5>
                        </div>
                        <div style={{ ...spaceBetween, }}>
                            <h5 style={{ margin: "0px" }}>Moms</h5>
                            <h5 style={{ margin: "0px" }}>{priceSummaryFunc("moms.delivery")} kr</h5>
                        </div>
                        <div style={{ ...spaceBetween, }}>
                            <h2>Att betala</h2>
                            <h2>{priceSummaryFunc("inc.delivery")} kr</h2>
                        </div>

                    </div>
                </div>
            </div>

            <div>
                <h2 style={{ color: colors.primary }}>Betalning:</h2>
                <RenderPaymentOptions />
            </div>

            <div>
                <h2 style={{ color: colors.primary }}>Dina uppgifter:</h2>

                {removeEmptyFields.map((input) => {

                    return (
                        <div key={input.label} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                            <h4 style={{ minWidth: "210px", color: colors.primary }}>{input.label}:</h4>
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue={input.value}
                                variant="filled"
                                size="small"
                                disabled
                                sx={textFieldSX}

                            />
                        </div>
                    )
                })}

            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop:"10px"}}>

                <div style={{ ...btnContainer({ devices: devices }), backgroundColor: colors.secondary, color:"white"}} onClick={validateNextStep}    >
                    {props.activeStep === props.steps.length - 1 ? 'Slutför köp' : props.activeStep == 0 ? 'Beställ' : 'Nästa'}
                </div>
            </div>

        </SectionCartContainer>
        <OrderConfirmWindow setOpen={setOpen} open={open} />
        </>
    )
}


export default CartSummary;