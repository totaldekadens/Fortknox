
import { CSSProperties, FC, useContext } from "react"
import ProductCardCart from "../product/productCardCart"

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputFieldsCart from "../interaction/inputFieldsCart";
import SummaryCard from "../payment/summaryCard";
import DeliveryPage from "../payment/delivery";
import CartSummary from "../payment/cartSummary";
import { cartContext } from "../context/cartProvider";
import { colors } from "../../data/color";
import { invoiceContext } from "../context/invoiceProvider";
import { deliveryContext } from "../context/deliveryProvider";
import { Link, ManOutlined } from "@mui/icons-material";
import { inputData } from "../../data/invoice";
import { DeviceContext } from "../context/mediaQueryProvider";

const steps = ['Varukorg', 'Integration', 'Faktureringsuppgifter', "Slutför köp"];

interface Props {}


const Confirmation: FC<Props> = (props) => {

    const { cartItem } = useContext(cartContext)
    const { getInputData, setInputData } = useContext(invoiceContext)
    const { deliveryInput, setDeliveryInput } = useContext(deliveryContext)
    const { devices } = useContext(DeviceContext)

    const clearHistory = () => {

    }

    return (
        <>
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "100%"}} >
            <h1 style={{color: colors.primary, textAlign: "center"}}>Tack för din beställning!</h1>
            <div style={{ display:"flex", justifyContent: "center", marginTop: "30px" }}>
                <Link to={"/"}>
                    <div style={{ ...btnContainer, backgroundColor: colors.secondary, }} onClick={clearHistory} >
                        Gå tillbaka till startsidan
                    </div>
                </Link>
            </div>
            <div style={{display: "flex", gap: "30px", marginTop: "40px" , flexWrap: "wrap", justifyContent: "center", width: "100%"}}>
                <div style={container}>
                    <div style={summaryCardContainer}>
                        <div style={{ ...sumContainer, padding: devices.isMobile ? "5px" : devices.isDesktop ? "30px" : devices.isTablet ? "30px" : "30px" }}>
                            <div>
                                <h2 style={{ ...noMarginbottom, color: colors.primary}}>Din order:</h2><hr />
                                <div>
                                    <h4 style={{ ...noMarginbottom, color: colors.primary }}>Paket</h4>
                                    <div style={{ ...spaceBetween }}>
                                        <h5 style={{fontSize: devices.isMobile ? "12px" : "16px", color: colors.secondary }} >Fortknox Bas</h5>
                                        <p style={{fontSize: devices.isMobile ? "12px" : "16px", color: colors.secondary}}>139 kr/mån</p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div>
                                <div style={{ ...spaceBetween }}>
                                    <h5 style={{ ...noMarginbottom, fontSize: devices.isMobile ? "12px" : "16px"  }}>Avtalsperiod</h5>
                                    <p style={{ ...noMarginbottom, fontSize: devices.isMobile ? "12px" : "16px"  }}>12/mån</p>
                                </div>
                                <div style={{ ...spaceBetween }}>
                                    <h5 style={{ ...noMarginbottom, fontSize: devices.isMobile ? "12px" : "16px"  }}>Summa</h5>
                                    <p style={{ ...noMarginbottom, fontSize: devices.isMobile ? "12px" : "16px"  }}>3000 kr/år</p>
                                </div>
                                <div style={{ display: "flex", justifyContent:"flex-end" }}>
                                    <p style={{ ...noMarginbottom, fontSize: devices.isMobile ? "12px" : "16px", justifyContent:"flex-end"  }}>385 kr/mån</p>
                                </div>
                            </div>
                            <div>
                                <h2 style={{ ...noMarginbottom, color: colors.primary }}>Faktureringsuppgifter:</h2>
                                <hr />
                            </div>
                            <div>
                                {inputData ?  inputData.map((input) => {
                                    return (
                                    <div key={input.label} style={{ ...spaceBetween }}>
                                        <h5 style={{ ...noMarginbottom, fontSize: devices.isMobile ? "12px" : "16px" }}>{input.label}</h5>
                                        <p  style={{ ...noMarginbottom, fontSize: devices.isMobile ? "12px" : "16px" }}>{input.value}</p>
                                    </div>
                                )
                                }) : <div>Finns ingen inputdata att ta ifrån</div> }
                            </div>
                        </div>
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
    minWidth: "320px",
    width: "100%"

}
const summaryCardContainer: CSSProperties = {
    marginBottom: "30px",
}



const sumContainer: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.textWhite,
    borderRadius: "10px",
    marginBottom: "20px",

}

const btnContainer: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "60px",
    borderRadius: "10px",
    cursor: "pointer",
    padding: "0px 20px 0px 20px"

}

const spaceBetween: CSSProperties = {
    display: "flex",
    justifyContent: "space-between"
}

const noMarginbottom: CSSProperties = {
    marginBottom: "0",
    color: colors.secondary
}



const labelCSS: CSSProperties = {
    fontWeight: "100px"

}

export default Confirmation

