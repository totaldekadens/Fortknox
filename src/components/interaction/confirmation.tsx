import { FC, useContext } from "react"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CSSProperties} from "react"
import * as React from 'react';
import { spaceBetween, summaryCardContainer } from "../payment/summaryCard";
import { cartContext } from "../context/cartProvider";
import { colors } from "../../data/color";
import InvoiceInfoProvider, { invoiceContext } from "../context/invoiceProvider";
import { deliveryContext } from "../context/deliveryProvider";
import { Link } from 'react-router-dom';
import { Device, DeviceContext, DeviceContextData } from "../context/mediaQueryProvider";
import { CartProduct } from "../../data/products";
import { paymentContext } from "../context/checkOutProvider";
import RenderPaymentOptions from "../payment/paymentOptions";
import { priceSummaryFunc } from "../payment/priceLogic";

interface Props {
    handleClose?: (answer: boolean) => void
    open: boolean
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

// Fetches date to estimated delivery date
const date = (time: number): string => {
    const today = new Date();
    const tomorrow = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: "short", year: "numeric", month: "long", day: "numeric" };
    tomorrow.setDate(today.getDate() + time);
    return tomorrow.toLocaleDateString("se-SE", options)
}

// Order confirmation window pops up after "Slutför köp"
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
                    minHeight: devices.isDesktop ? "90vh" : devices.isTablet ? "90vh" : devices.isMobile ? "100vh" : "90vh",
                    maxWidth: devices.isDesktop ? "70vw" : devices.isTablet ? "80vw" : devices.isMobile ? "100vw" : "100vw",
                    margin: devices.isDesktop ? "32p" : devices.isTablet ? "32px" : devices.isMobile ? "0px" : "0px"
                },
            },
        }}
        >
            <DialogContent>
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
                                            {cartItem ? renderInfoWithCont(cartItem!.name, cartItem!.price12mth , devices, true, " kr/mån")
                                            : <div>{"Finns inget paket"}</div>
                                            }
                                        </div>
                                        <hr />
                                    </div>
                                    <div>
                                        {cartItem ? extraOrder(cartItem, devices)
                                        : undefined}
                                    </div>
                                    <div>
                                        <h4 style={{ ...noMarginbottom, color: colors.primary }}>Leverans</h4>
                                        {deliveryInput ? 
                                        <>
                                            <div>
                                                {renderInfoWithCont("Typ", deliveryInput?.title, devices, false)}
                                                {renderInfoWithCont("Antal dagar", deliveryInput?.numberOfDays, devices, false, " dag(ar)")}
                                                {renderInfoWithCont("Leverandsdag", date(deliveryInput!.numberOfDays), devices, false)}
                                                {renderInfoWithCont("Pris", deliveryInput?.price, devices, true, " kr")}
                                            </div>
                                            <hr />
                                        </>
                                        : <div>{"Finns ingen leverans"}</div> }
                                        </div>
                                    <div>
                                        <h4 style={{ ...noMarginbottom, color: colors.primary }}>Summering abonnemang</h4>
                                        {renderInfoWithCont("Avtalsperiod", "12 mån", devices, false)}
                                        {renderInfoWithCont("Summa", priceSummaryFunc("ex.year"), devices, true, "kr/år", colors.secondary)}
                                        <div style={{ display: "flex", justifyContent:"flex-end" }}>
                                            <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices}), justifyContent:"flex-end"  }}>{priceSummaryFunc("ex.month")} kr/mån</h5> 
                                        </div>
                                        <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                                            <p style={{fontSize: "9px", margin: "0px" }}> ({priceSummaryFunc("inc.month")}  kr inkl. moms)</p>
                                        </div>

                                        <p style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: "black"  }}>När du betalat leveranskostnaden, startar vi integrationen av ditt paket. När integrationen är gjord påbörjas din abonnemangstid hos oss. Du kommer få en inbetalningsförfrågan via det betalsätt du valt.</p>
                                    </div>
                                    <h4 style={{ ...noMarginbottom, color: colors.primary }}>Betalning (Leverans)</h4>
                                    <div style={{ ...spaceBetween, color: colors.secondary, ...fontSize({devices: devices})  }}>
                                            <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices})  }}>Totalt</h5>
                                            <h3 > {deliveryInput?.price} kr</h3>
                                    </div>
                                    <div style={{ ...spaceBetween, color: colors.secondary, ...fontSize({devices: devices})  }}>
                                            <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices})  }}>Moms</h5>
                                            <h3>{priceSummaryFunc("moms.delivery")} kr</h3>
                                    </div>
                                    <div style={{ ...spaceBetween, color: colors.secondary, ...fontSize({devices: devices})  }}>
                                            <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices})  }}>Totalt inkl. moms</h5>
                                            <h3 style={{textDecoration: "underline"}}> {deliveryInput ? deliveryInput?.price*1.25 : undefined } kr</h3>
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
                                        <h2 style={{ ...noMarginbottom, color: colors.primary}}>Betalsätt:</h2><hr />
                                        <div>
                                            <h4 style={{ ...noMarginbottom, color: colors.primary }}>{paymentOptionState?.name}</h4> 
                                            <div style={{ ...spaceBetween }}>
                                                {paymentOptionState?.name == "Swish" ? 
                                                    renderInfo(paymentOptionState.input![0].label, paymentOptionState.input![0].value, devices)
                                                : paymentOptionState?.name == "Kortbetalning" ? 
                                                    renderInfo(paymentOptionState.input![0].label, String(paymentOptionState!.input![0].value).slice(-4), devices, "****")
                                                :  <div></div>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


const renderInfo = (title: string, info: string | number, devices: Device, prefix?: string ) => {
    return (
        <>
        <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary }} >{title}</h5> 
        <p style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary}}>{prefix}{info}</p> 
        </>
    ) 
}

const renderInfoWithCont = (title: string, info: string | number | JSX.Element | undefined, devices: Device, moms: boolean, suffix?: string, color?: string ) => {
    return (
        <>
            <div style={{ ...spaceBetween, color: color }}>
                <h5 style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary }} >{title}</h5> 
                <p style={{ ...noMarginbottom, ...fontSize({devices: devices}), color: colors.secondary}}>{info}{suffix}</p> 
            </div>
            {moms ? 
            <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                <p style={{fontSize: "9px", margin: "0px" }}> ({Number(info)*1.25} kr inkl. moms)</p>
            </div> : undefined }
        </>
    ) 
}

// This function with similar features is used on another component. With more time we could have done this more dynamic to minimize recurrence
const extraOrderRender = (cartItem: CartProduct | undefined, devices: Device ) => {
    return cartItem?.including.map(includeObj => {
        if (includeObj.qty > 1) {

            return (
                <>
                    <div key={includeObj.include.name} style={{ ...spaceBetween, width: "100%" }}>
                        <h5 style={{ width: "33%", margin: "10px 0px", color: colors.secondary, ...fontSize({devices: devices})}}>{includeObj.include?.name}</h5>
                        <p style={{ width: "33%", textAlign: "center", margin: "10px 0px", color: colors.secondary, ...fontSize({devices: devices})   }}>{includeObj.qty - 1} st</p>
                        <p style={{ width: "33%", margin: "10px 0px", color: colors.secondary, textAlign: "end", ...fontSize({devices: devices})   }}>{includeObj.include?.price} kr/mån</p>
                    </div>
                    <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                        <p style={{fontSize: "9px", margin: "0px" }}> {includeObj.include?.price*1.25}  kr inkl. moms</p>
                    </div>
                </>
            )
        } else {
            return undefined
        }
    })
}
// This function with similar features is used on another component. With more time we could have done this more dynamic to minimize recurrence
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

const fontSize : (devices: DeviceContextData) => CSSProperties = (devices) => {
    return {
        fontSize: devices.devices.isMobile ? "12px" : "14px"
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

function componentWillUnmount(InvoiceInfoProvider: FC<React.PropsWithChildren<Props>>) {
    throw new Error("Function not implemented.");
}

export default OrderConfirmWindow
