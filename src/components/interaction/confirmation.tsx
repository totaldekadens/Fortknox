import { FC, useContext } from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import { Product } from "../../data/products";
import { CSSProperties} from "react"
import * as React from 'react';
import { spaceBetween, summaryCardContainer, priceSummaryFunc } from "../payment/summaryCard";
import { cartContext } from "../context/cartProvider";
import { colors } from "../../data/color";
import InvoiceInfoProvider, { invoiceContext } from "../context/invoiceProvider";
import { deliveryContext } from "../context/deliveryProvider";
import { ManOutlined } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { inputData } from "../../data/invoice";
import { Device, DeviceContext, DeviceContextData } from "../context/mediaQueryProvider";
import { CartProduct } from "../../data/products";
import ReactDOM from "react-dom";
import { PropsWithChildren, useEffect } from "react";
import { paymentContext } from "../context/checkOutProvider";
import RenderPaymentOptions from "../payment/paymentOptions";

interface Props {
    handleClose?: (answer: boolean) => void
    open: boolean
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}



const OrderConfirmWindow: FC<Props> = (props) => {
    
    const { cartItem, setCartItem } = useContext(cartContext)
    const { getInputData, setInputData } = useContext(invoiceContext)
    const { deliveryInput, setDeliveryInput } = useContext(deliveryContext)
    const { paymentOptionState, setPaymentOptionState } = useContext(paymentContext);
    const { devices } = useContext(DeviceContext)

    const clearHistory = () => {
        props.setOpen!(false);
        setCartItem(undefined)
        localStorage.removeItem('cartItem');
        componentWillUnmount(InvoiceInfoProvider)
        componentWillUnmount(RenderPaymentOptions)
    }

    return (
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "100%",
                   /*  height: devices.isDesktop ? "100%" : devices.isTablet ? "100%" : devices.isMobile ? "100vh" : "100vh", */
                    minHeight: "90vh",
                    maxWidth: devices.isDesktop ? "70vw" : devices.isTablet ? "80vw" : devices.isMobile ? "97vw" : "100vw",
                    margin: devices.isDesktop ? "32p" : devices.isTablet ? "32px" : devices.isMobile ? "0px" : "0px"
                },
            },
        }}
        >
            <DialogContent>
            <>
        <div style={{...rootContainer}} >
            <h1 style={{color: colors.primary, textAlign: "center", marginTop: devices.isDesktop ? "50px" : devices.isTablet ? "50px" : devices.isMobile ? "20px" : "50px" }}>Tack för din beställning!</h1>
            <div style={{ display:"flex", justifyContent: "center", marginTop: "30px" }}>
                <Link style={{ ...btnContainer, backgroundColor: colors.secondary, color: colors.textWhite, textDecoration: "none" }} onClick={clearHistory}  to={"/"}>
                    Gå tillbaka till startsidan
                </Link>
            </div>
            <div style={{display: "flex", gap: "30px", marginTop: "40px" , flexWrap: "wrap", justifyContent: "center", width:  devices.isDesktop ? "60%" : devices.isTablet ? "75%" : devices.isMobile ? "90%" : "90%"}}>
                <div style={container}>
                    <div style={summaryCardContainer}>
                        <div style={{ ...sumContainer, padding: devices.isMobile ? "5px" : devices.isDesktop ? "30px" : devices.isTablet ? "30px" : "30px" }}>
                            <div>
                                <h2 style={{ ...noMarginbottom, color: colors.primary}}>Din order:</h2><hr />
                                <div>
                                    <h4 style={{ ...noMarginbottom, color: colors.primary }}>Paket</h4>
                                    <div style={{ ...spaceBetween }}>
                                        <h5 style={{ ...fontSize({devices: devices}), color: colors.secondary }} >{cartItem?.name}</h5>
                                        <p style={{ ...fontSize({devices: devices}), color: colors.secondary}}>{cartItem?.price3mth}  kr/mån</p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div>
                                {extraOrder(cartItem, devices)}
                            </div>
                            <div>
                                <div style={{ ...spaceBetween }}>
                                    <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices})}}>Avtalsperiod</h5>
                                    <p style={{ ...noMarginbottom, ...fontSize({devices: devices})  }}>12 mån</p>
                                </div>
                                <div style={{ ...spaceBetween, color: colors.secondary, ...fontSize({devices: devices})  }}>
                                    <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices})  }}>Summa</h5>
                                    {priceSummaryFunc("inc.year")}
                                </div>
                                <div style={{ display: "flex", justifyContent:"flex-end" }}>
                                    <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices}), justifyContent:"flex-end"  }}>385 kr/mån</h5> {/* // Skall renderas ut. väntar på Freddan */}
                                </div>
                            </div>
                            <div>
                                <h2 style={{ ...noMarginbottom, color: colors.primary }}>Faktureringsuppgifter:</h2>
                                <hr />
                            </div>
                            <div>
                                {getInputData ?  getInputData.map((input) => {
                                    return (
                                    <div key={input.label} style={{ ...spaceBetween }}>
                                        <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices}) }}>{input.label}</h5>
                                        <p  style={{ ...noMarginbottom, ...fontSize({devices: devices}) }}>{input.value}</p>
                                    </div>
                                )
                                }) : <div>Finns ingen inputdata att ta ifrån</div> }
                            </div>
                            <div>
                                <h2 style={{ ...noMarginbottom, color: colors.primary}}>Leverans:</h2><hr />
                                <div>
                                    <h4 style={{ ...noMarginbottom, color: colors.primary }}>{deliveryInput?.title}</h4>
                                    <div style={{ ...spaceBetween }}>
                                        <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary }} >Leveranstid</h5>
                                        <p style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary}}>{deliveryInput?.numberOfDays} dag(ar)</p>
                                    </div>
                                    <div style={{ ...spaceBetween }}>
                                        <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary }} >Leveransdag</h5>
                                        <p style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary}}>Rendera ut datum här</p>
                                    </div>
                                    <div style={{ ...spaceBetween }}>
                                        <h5 style={{...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary }} >Pris</h5>
                                        <p style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary}}>{deliveryInput?.price} kr</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 style={{ ...noMarginbottom, color: colors.primary}}>Betalsätt:</h2><hr />
                                <div>
                                    <h4 style={{ ...noMarginbottom, color: colors.primary }}>Faktura</h4> {/* Fixa rendering när Freddan är klar */}
                                    <div style={{ ...spaceBetween }}>
                                        <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary }} ></h5>  {/* Fixa rendering när Freddan är klar */}
                                        <p style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary}}></p>  {/* Fixa rendering när Freddan är klar */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
            </DialogContent>
        </Dialog>
    )
}



// Kolla med Freddan om dessa kan exporteras från hans istället med property "cartItem" Gäller extraOrdeRender och extraOrder
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const extraOrderRender = (cartItem: CartProduct | undefined, devices: Device ) => {
    return cartItem?.including.map(includeObj => {
        if (includeObj.qty > 1) {

            return (
                <div key={includeObj.include.name} style={{ ...spaceBetween, width: "100%" }}>
                    <h5 style={{ width: "33%", margin: "10px 0px", color: colors.secondary, ...fontSize({devices: devices})}}>{includeObj.include?.name}</h5>
                    <p style={{ width: "33%", textAlign: "center", margin: "10px 0px", color: colors.secondary, ...fontSize({devices: devices})   }}>Antal: {includeObj.qty - 1}</p>
                    <p style={{ width: "33%", margin: "10px 0px", color: colors.secondary, textAlign: "end", ...fontSize({devices: devices})   }}>{includeObj.include?.price} kr/mån</p>
                </div>
            )
        } else {
            return undefined
        }
    })

}

const extraOrder = (cartItem: CartProduct | undefined, devices: Device ) => {

    if(cartItem) {
        const foundQtyChange = cartItem!.including.find((x) => 1 < x.qty)

        if (foundQtyChange) {
            return (<div>
                <div style={{ ...spaceBetween }}>
                    <h4 style={{color: colors.primary}}>Extra licenser</h4>
                </div>
                {extraOrderRender(cartItem, devices)}
                <hr />
            </div>
            )
        } else {
            return undefined
        }
    } else {
        return undefined
    }
   

}
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fontSize : (devices: DeviceContextData) => CSSProperties = (devices) => {
    return {
        fontSize: devices.devices.isMobile ? "12px" : "16px"
    }
    
}

const rootContainer: CSSProperties = {
    display: "flex", 
    backgroundColor: "white",  
    justifyContent: "center", 
    flexDirection: "column", 
    alignItems: "center", 
    width: "100%"
}

const container: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minWidth: "320px",
    width: "100%"

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

const noMarginbottom: CSSProperties = {
    marginBottom: "0",
    color: colors.secondary
}



const labelCSS: CSSProperties = {
    fontWeight: "100px"

}


function componentWillUnmount(InvoiceInfoProvider: FC<React.PropsWithChildren<Props>>) {
    throw new Error("Function not implemented.");
}

export default OrderConfirmWindow