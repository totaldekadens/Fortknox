import { Info } from "@mui/icons-material"
import Button from "@mui/material/Button"
import { color, height } from "@mui/system"
import { CSSProperties, FC, useContext } from "react"
import { colors } from "../../data/color"
import { cartContext } from "../context/cartProvider"
import { products } from "../../data/products"
import { paymentContext } from "../context/checkOutProvider"
import { deliveryContext } from "../context/deliveryProvider"
import { invoiceContext } from "../context/invoiceProvider"
import errorLoop from "../interaction/inputFieldsCartErrorHandler"
import { validateFields } from "../interaction/paymentOptionsErrorHandler"

import { DeviceContext, DeviceContextData } from "../context/mediaQueryProvider"

import React from "react"
import OrderConfirmWindow from "../interaction/confirmation"
import { priceSummaryFunc } from "./priceLogic"





interface Props {
    nextFunc: () => void
    activeStep: number,
    steps: string[]
}


const SummaryCard: FC<Props> = (props) => {
    const { getInputData, setInputData } = useContext(invoiceContext)
    const { deliveryInput, setDeliveryInput } = useContext(deliveryContext)
    const { paymentOptionState, setPaymentOptionState } = useContext(paymentContext);
    const { cartItem, setCartItem } = useContext(cartContext)

    const { devices } = useContext(DeviceContext)

    const [open, setOpen] = React.useState(false);


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

    const renderDelivery = () => {
        if (props.activeStep >= 1) {
            if (deliveryInput) {

                return (
                    <div key={deliveryInput!.title}>
                        <div style={{ ...spaceBetween }}>
                            <h4>Leverans </h4>
                        </div>
                        <div style={{ ...spaceBetween }} >
                            <h5 style={{ ...noMarginbottom }}>{deliveryInput!.title}</h5>
                            <h5 style={{ ...noMarginbottom }}>{deliveryInput!.price} kr</h5>
                        </div>
                        <h6>* Leveransen betalas direkt.</h6>
                        <hr />
                    </div>

                )
            }
        } else {
            return undefined
        }
    }

    const extraOrderRender = () => {
        return cartItem?.including.map(includeObj => {
            if (includeObj.qty > 1) {
                return (
                    <div key={includeObj.include.name} style={{ ...spaceBetween }}>
                        <h5 style={{ width: "33%", margin: "10px 0px" }}>{includeObj.include?.name}</h5>
                        <h5 style={{ width: "33%", textAlign: "center", margin: "10px 0px" }}>{includeObj.qty - 1} st</h5>
                        <h5 style={{ width: "33%", margin: "10px 0px" }}>{includeObj.include?.price} kr/mån</h5>
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

    return (
        <>
            <div style={container({devices: devices})}>
                <div style={summaryCardContainer}>
                    <div style={{ ...sumContainer({devices: devices}), padding: "30px" }}>
                        <div>
                            <h1 style={{ ...noMarginbottom, color: colors.fourth }}>Din Varukorg</h1>
                            <div>
                                <h4 style={{ ...noMarginbottom }}>Paket</h4>
                                <div style={{ ...spaceBetween }}>
                                    <h5 >{cartItem?.name}</h5>
                                    <h5>{cartItem?.price12mth} kr/mån</h5>
                                </div>
                            </div>
                            <hr />
                        </div>

                        <div>
                            {extraOrder()}
                        </div>

                        <div>
                            <div style={{ ...spaceBetween }}>
                                <h5 style={{ ...noMarginbottom }}>Avtalsperiod</h5>
                                <h5 style={{ ...noMarginbottom }}>12/mån</h5>
                            </div>
                            <div style={{ ...spaceBetween }}>
                                <h5 style={{ ...noMarginbottom }}>Summa</h5>
                                <h5 style={{ ...noMarginbottom }}> {priceSummaryFunc("ex.year")} kr/år</h5>
                            </div>
                            <hr />
                            {renderDelivery()}
                            <h6>* Priser är exklusive moms.</h6>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ ...spaceBetween, width: "80%", alignItems: "center", backgroundColor: "white", padding: "0 20px", borderRadius: "10px", color: "black" }}>
                                <h5>Att betala</h5>
                                <div style={{ display: "flex" }}>
                                    <h1>{priceSummaryFunc("ex.month")}</h1>
                                    <h5>kr/mån</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div style={{ ...btnContainer({devices: devices}), backgroundColor: colors.secondary, }} onClick={validateNextStep}    >
                            {props.activeStep === props.steps.length - 1 ? 'Slutför köp' : props.activeStep == 0 ? 'Beställ' : 'Nästa'}
                        </div>
                    </div>
                </div>
            </div>
            < OrderConfirmWindow setOpen={setOpen} open={open} />
        </>
    )

}


const container: (devices: DeviceContextData) => CSSProperties = (devices) => {
    
    return {
        display: "flex",
        flexDirection: "column",
        minWidth: "350px",
        width: devices.devices.isMobile ? "100%" : "350px"
    }


}
export const summaryCardContainer: CSSProperties = {
    marginBottom: "30px",
}

const sumContainer: (devices: DeviceContextData) => CSSProperties = (devices) => {

    return {
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.primary,
        borderRadius: devices.devices.isMobile ? "0px" : "10px",
        marginBottom: "20px",
        padding: "0 30px",
    }

}

const btnContainer: (devices: DeviceContextData) => CSSProperties = (devices) => {

    return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: devices.devices.isMobile ? "60%": "100%",
        minHeight: "60px",
        borderRadius: "40px",
        cursor: "pointer"
    }

}

export const spaceBetween: CSSProperties = {
    display: "flex",
    justifyContent: "space-between"
}

const noMarginbottom: CSSProperties = {
    marginBottom: "0"
}




export default SummaryCard