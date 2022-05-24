import { colors } from "../data/color"
import { flexColumn } from '../style/common'
import { CSSProperties, FC } from "react"

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { alignProperty } from "@mui/material/styles/cssUtils";

interface Props {}


const Footer: FC<Props> = (props) => { 

    return (
        <div style={{...footerStyle, ...flexColumn}}>

            <div style={footerColumnContainer}>
                <div style={{...footerContainer, ...flexColumn}}>
                    <div>
                        <h3>Hitta till oss</h3>
                        <p style={{...margin, ...textMargin}}>Anders Personsgatan 18</p>
                        <p style={margin}>416 64 Göteborg</p>
                    </div>
                </div>
                <div style={{...footerContainer, ...flexColumn}}>
                    <div style={footerCenterText}>
                    <h3>Kontakta oss</h3>
                    <div style={iconContainer}>
                        <AlternateEmailIcon />
                        <p style={margin}>hej@fortknox.se</p>
                    </div>
                    <div style={iconContainer}>
                        <PhoneIcon />
                        <p style={margin}>031-123 456</p>
                    </div>
                    </div>
                </div>

            </div>
            { /* Här bör samma divider som Angelica har gjort användas? */ }
            <div style={divider}></div>

            <div style={{...footerColumnContainer, ...bottomFooterColumnContainer}}>
                <div style={paymentIcons}>
                    <CreditCardIcon />
                    <CreditCardIcon />
                    <CreditCardIcon />
                    <CreditCardIcon />
                </div>
                <div>
                    <p style={margin}>&copy; Fortknox AB</p>
                </div>
            </div>


        </div>
        
    )

}


export default Footer



const footerStyle: CSSProperties = {
    width: "100%",
    paddingBottom: "30px",
    color: "white",
    backgroundColor: colors.primary,
    alignItems: "center",
}

const footerColumnContainer: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
}

const footerContainer: CSSProperties = {
    width: "40%",
    minWidth: "300px",
    color: "white",
    display: "flex",
    margin: "10px",
    alignItems: "center",

}

const footerCenterText: CSSProperties = {
    minWidth: "195px",
}

const iconContainer: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    margin: "0 0 15px",
}

const margin: CSSProperties = {
    margin: "0",
}

const textMargin: CSSProperties = {
    margin: "0 0 15px",
}

const divider: CSSProperties = {
    width: "80%",
    height: "3px",
    backgroundColor: colors.secondary,
    borderRadius: "10px",
}

const paymentIcons: CSSProperties = {
    display: "flex",
    justifyContent: "center",
}

const bottomFooterColumnContainer: CSSProperties = {
    width: "70%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
}