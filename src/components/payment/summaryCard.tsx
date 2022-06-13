import { Info } from "@mui/icons-material"
import Button from "@mui/material/Button"

import { color, height } from "@mui/system"
import { CSSProperties, FC, useContext } from "react"
import { colors } from "../../data/color"
import { products } from "../../data/products"
import { paymentContext } from "../context/checkOutProvider"
import { deliveryContext } from "../context/deliveryProvider"
import { invoiceContext } from "../context/invoiceProvider"
import errorLoop from "../interaction/inputFieldsCartErrorHandler"
import { validateFields } from "../interaction/paymentOptionsErrorHandler"



interface Props {
    nextFunc: () => void
    activeStep: number,
    steps: string[]
}


const SummaryCard: FC<Props> = (props) => {
    const { getInputData, setInputData } = useContext(invoiceContext)
    const { deliveryInput, setDeliveryInput } = useContext(deliveryContext)
    const { paymentOptionState, setPaymentOptionState } = useContext(paymentContext);

    const validateNextStep = () => {

        if(props.activeStep === 0) {
            
            props.nextFunc()
        }
        if(props.activeStep === 1) {
            
            deliveryInput ? props.nextFunc() : undefined; 

        }
        if(props.activeStep === 2) {

            // Fick kalla på errorloopen här sålänge för att det skulle fungera
            const result = errorLoop(getInputData)
            setInputData(result); 
            
            // Kollar om något error state är true (dvs är fel)
            const found = result.find(e => e.errorState == true || e.required == true && e.value == "")

            // Om inga fel hittade sätt knapp till enable annars disable
            !found ? props.nextFunc() : undefined; 
        } 

        if(props.activeStep === 3) {

            if(paymentOptionState) {

                if(paymentOptionState.input) {

                    const result = validateFields({...paymentOptionState});
                    setPaymentOptionState(result)

                    // Kollar om något error state är true (dvs är fel)
                    const found = result!.input!.find(e => e.errorState == true)
                    // Om inga fel hittade sätt knapp till enable annars disable
                    !found ? props.nextFunc() : undefined; 

                } else {

                    props.nextFunc();

                }
            }
            

        }

    }

    return (
        <>
            <div style={container}>
                <div style={summaryCardContainer}>
                    <div style={{ ...sumContainer, padding: "30px" }}>
                        <div>
                            <h1 style={{ ...noMarginbottom, color: colors.fourth }}>Din Varukorg</h1>
                            <div>
                                <h4 style={{ ...noMarginbottom }}>Paket</h4>
                                <div style={{ ...spaceBetween }}>
                                    <h5 >Fortknox Bas</h5>
                                    <h5>139 kr/mån</h5>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div>
                            <div style={{ ...spaceBetween }}>
                                <h5 style={{ ...noMarginbottom }}>Avtalsperiod</h5>
                                <h5 style={{ ...noMarginbottom }}>12/mån</h5>
                            </div>
                            <div style={{ ...spaceBetween }}>
                                <h5 style={{ ...noMarginbottom }}>Summa</h5>
                                <h5 style={{ ...noMarginbottom }}>3000 kr/år</h5>
                            </div>
                            <hr />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ ...spaceBetween, width: "80%", alignItems: "center", backgroundColor: "white", padding: "0 20px", borderRadius: "10px", color: "black" }}>
                                <h5>Att betala</h5>
                                <div style={{ display: "flex" }}>
                                    <h1>385</h1>
                                    <h5>kr/mån</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display:"flex", justifyContent: "center" }}>

                        <div style={{ ...btnContainer, backgroundColor: colors.secondary, }} onClick={validateNextStep}    >
                            {props.activeStep === props.steps.length - 2 ? 'Slutför köp' : props.activeStep == 0 ? 'Beställ' : 'Nästa'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const container: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minWidth: "350px",
    marginLeft: "5em"

}
const summaryCardContainer: CSSProperties = {
    marginBottom: "30px",

    
}



const sumContainer: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.primary,
    borderRadius: "10px",
    marginBottom: "20px",
    padding: "0 30px",
    


}

const btnContainer: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "60px",
    borderRadius: "40px",
    cursor: "pointer"

}

const spaceBetween: CSSProperties = {
    display: "flex",
    justifyContent: "space-between"
}

const noMarginbottom: CSSProperties = {
    marginBottom: "0"
}




export default SummaryCard