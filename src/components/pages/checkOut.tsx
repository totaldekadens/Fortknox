
import { CSSProperties, FC, useContext, useEffect } from "react"
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
import SectionCartContainer from "../common/sectionCartContainer";

import { DeviceContext, DeviceContextData } from "../context/mediaQueryProvider";


import OrderConfirmWindow from "../interaction/confirmation";


const steps = ['Varukorg', 'Leverans', 'Faktureringsuppgifter', "Slutför köp"];



interface Props { }


const CheckOut: FC<Props> = (props) => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const [open, setOpen] = React.useState(false);
    const { cartItem } = useContext(cartContext)
    const { devices } = useContext(DeviceContext)

    // Scrolls the user to the top of the page on update of step.
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [activeStep])



    const isStepOptional = (step: number) => {
        return false;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    

    return (
        <>
        <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "center", marginTop: activeStep == 4 ? "10px" : "50px"}}>
                
                <Stepper activeStep={activeStep} style={{ display: "flex", width: "80%", alignItems: "center", justifyContent: "center", flexWrap: "wrap", ...stepStyle({devices: devices}) }}>
                {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }

                        return (
                            <Step key={label} {...stepProps} >
                                <StepLabel style={{cursor: "pointer"}}{...labelProps} onClick={() => {index < activeStep ? setActiveStep(index) : undefined}}>{label}</StepLabel>
                            </Step>
                        );
                })}

            </Stepper> 
            
                
            </div>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}></Typography>

                    {/*  container div for checkout  */}
                    <div style={stepperContentContainer({devices: devices})}>
                        {activeStep == 0 ? (<><SectionCartContainer><ProductCardCart /></SectionCartContainer> {cartItem ?  <SummaryCard nextFunc={handleNext} activeStep={activeStep} steps={steps} /> : undefined }</>) : ""}
                        {activeStep == 1 ? (<><DeliveryPage />  <SummaryCard nextFunc={handleNext}  activeStep={activeStep} steps={steps}/></>) : ""}
                        {activeStep == 2 ? (<><SectionCartContainer><InputFieldsCart /></SectionCartContainer> <SummaryCard nextFunc={handleNext} activeStep={activeStep} steps={steps} /> </>) : ""}
                        {activeStep == 3 ? (<><CartSummary /> <SummaryCard  nextFunc={handleNext} activeStep={activeStep} steps={steps} /> </>) : ""}
                    </div>
                </React.Fragment>
            )}
        </Box>
        < OrderConfirmWindow setOpen={setOpen} open={open} />
        </>
    );



}

const labelCSS: CSSProperties = {
    fontWeight: "100px"
}

export const stepperContentContainer: (devices: DeviceContextData) => CSSProperties = (devices) => {
    return {
        maxWidth: devices.devices.isDesktop ? "80%" : "100%", 
        paddingBottom: "20px",
        display: "flex", 
        gap: "20px", 
        justifyContent: "center", 
        flexWrap: devices.devices.isDesktop ? "nowrap" : "wrap",
    }

}

const stepStyle:  (devices: DeviceContextData) => CSSProperties = (devices) => { 

    return {
        flexDirection: devices.devices.isDesktop ? "row" : "column",
        alignItems: devices.devices.isDesktop ? "center" : "start",
        gap: devices.devices.isDesktop ? "0px" : "10px",
    }


}

export default CheckOut