import { Info } from "@mui/icons-material"
import Button from "@mui/material/Button"

import { color, height } from "@mui/system"
import { CSSProperties, FC, useContext } from "react"
import { colors } from "../../data/color"
import { includings, products, Salary } from "../../data/products"
import { cartContext } from "../context/cartProvider"
import { deliveryContext } from "../context/deliveryProvider"
import { invoiceContext } from "../context/invoiceProvider"
import errorLoop from "../interaction/inputFieldsCartErrorHandler"


interface Props {
    nextFunc: () => void
    activeStep: number,
    steps: string[]
    statusButton: string
    setStatusButton: React.Dispatch<React.SetStateAction<string>>
}


const SummaryCard: FC<Props> = (props) => {
    const { getInputData, setInputData } = useContext(invoiceContext)
    const { deliveryInput, setDeliveryInput } = useContext(deliveryContext)
    const { cartItem, setCartItem } = useContext(cartContext)
    
    
    const extraOrderRender = () => {
        return cartItem?.including.map(includeObj => {
            if (includeObj.qty > 1) {

             
                return (
                    <div key={includeObj.include.name} style={{ ...spaceBetween }}>
                        <h5 style={{ width: "33%", margin: "10px 0px" }}>{includeObj.include?.name}</h5>
                        <h5 style={{ width: "33%", textAlign: "center", margin: "10px 0px" }}>Antal: {includeObj.qty - 1}</h5>
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
            return (<div>
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
            !found ? props.setStatusButton("enable") : props.setStatusButton("disable") // Får se om vi använder denna?
            !found ? props.nextFunc() : undefined;
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
                            {extraOrder()}
                        </div>
                        <div>
                            <div style={{ ...spaceBetween }}>
                                <h5 style={{ ...noMarginbottom }}>Avtalsperiod</h5>
                                <h5 style={{ ...noMarginbottom }}>12/mån</h5>
                            </div>
                            <div style={{ ...spaceBetween }}>
                                <h5 style={{ ...noMarginbottom }}>Summa</h5>
                                { totalAmount()}
                                
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
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div style={{ ...btnContainer, backgroundColor: colors.secondary, }} onClick={validateNextStep}    >

                            {props.activeStep === props.steps.length - 1 ? 'Slutför köp' : 'Nästa'}
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
    
}
function totalAmount(){
    const { cartItem, setCartItem } = useContext(cartContext)
    const { deliveryInput, setDeliveryInput } = useContext(deliveryContext)
    
    let totalPriceForIncludes: number = 0;
    if(cartItem){

        totalPriceForIncludes += cartItem!.price12mth
    }

    cartItem?.including.forEach((x)=> {
        
        if(x.qty > 1 && x.include.price && x.include?.name != "Integration"){
            let qty = x.qty - 1
            totalPriceForIncludes += qty * x.include.price
            
        }else{
            return undefined
        }
    })
    return <h5 style={{ ...noMarginbottom }}> {totalPriceForIncludes * 12} kr/år</h5>
    
   
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