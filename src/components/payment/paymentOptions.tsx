import {FC, useContext} from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, Radio, RadioGroup, TextField } from '@mui/material';
import { PaymentOptions, paymentOptions } from '../../data/paymentOptions';
import { colors } from '../../data/color';
import { paymentContext } from '../context/checkOutProvider';

interface Props {}

const RenderPaymentOptions: FC<Props> = (props) => {

    const { paymentOptionState, setPaymentOptionState } = useContext(paymentContext);

    const setPaymentOptionDelay = (paymentOption: PaymentOptions) => {
        setPaymentOptionState(undefined);

        setTimeout(() => {
            setPaymentOptionState(paymentOption)
        }, 500)

    }

    const setPaymentOptionOnLoad = () => {
        !paymentOptionState ? setPaymentOptionState(paymentOptions[0]): undefined
    }

    React.useEffect(() => {
        setPaymentOptionOnLoad();
    }, [])

    const textFieldColor = "white";
    const textFieldSX = {
        input: {
            "WebkitTextFillColor": `${textFieldColor} !important`,
            color: `${textFieldColor} !important`,
        },
    };

    const setInput = (id: number, name: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {

        
        if (paymentOptionState) {

            // Copy of the inputData array from the state.
            const paymentOptionStateCopy = {...paymentOptionState};

            if(paymentOptionStateCopy.input) {
                let inputValue = e.target.value;

                // Sets the value from the input field to the correct object.
                let inputIndex = paymentOptionStateCopy.input.findIndex(input => input.name == name);

                paymentOptionStateCopy.input[inputIndex].value = inputValue;

                // Updates the state to the updated list of objects.
                setPaymentOptionState(paymentOptionStateCopy);

            }
        }

    }


    // Function for validating the choosen fields.
    const testCard = () => {

        if(paymentOptionState) {

            if(paymentOptionState.id === 2) {

                    const inputDataCopy = {...paymentOptionState};

                    if(inputDataCopy.input) {

                        inputDataCopy.input.map((input) => {

                            // Copy of the input object from the state.
                                // Checks for empty input value.
                            if( input.value === "" || input.value == " ") {

                                input.errorState = true;
                                input.error = "Vänligen fyll i detta fält.";
                                return input;

                                // Checks for special characters in the input value.
                            } else if( input.name === "Kortnummer" && !/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(input.value.toString())) {

                                input.errorState = true;
                                input.error = "Detta är inte ett giltigt kortnummer.";
                                return input;
                            } else if( input.name === "Utgångsdatum" && input.value.toString().length != 4) {

                                input.errorState = true;
                                input.error = "Vänligen ange utgångsdatumet som XXXX";
                                return input;

                            } else if( input.name === "CVC" && input.value.toString().length != 3) {

                                input.errorState = true;
                                input.error = "Detta är inte ett giltigt CVC-nummer";
                                return input;
                            } else if( input.name === "Kortinnehavarens namn" && input.value.toString().length < 3) {

                                input.errorState = true;
                                input.error = "Vänligen ange ditt namn";
                                return input;

                                // Sets the error state to false since the field is filled out correctly.
                            } else {
                
                                input.errorState = false;
                                input.error = "";
                                return input;
                
                            }
                        })
                
                        // Updates the state for re-rendering the fields that have been updated.
                        setPaymentOptionState(inputDataCopy)
                    }
            }
            if(paymentOptionState.id === 1) {

                    const inputDataCopy = {...paymentOptionState};

                    if(inputDataCopy.input) {

                        inputDataCopy.input.map((input) => {

                            // Copy of the input object from the state.
                            // Checks for empty input value.
                            if( input.value === "" || input.value == " ") {

                                input.errorState = true;
                                input.error = "Vänligen fyll i detta fält.";
                                return input;

                                // Checks for special characters in the input value.
                            } else if(!/^07([0-9][ -]*){7}[0-9]$/.test(input.value.toString())) {

                                input.errorState = true;
                                input.error = "Detta är inte ett giltigt mobilnummer. Fyll ditt mobilnummer och börja med 07.";
                                return input;

                                // Sets the error state to false since the field is filled out correctly.
                            } else {

                                input.errorState = false;
                                input.error = "";
                                return input;

                            }
                        })
                        
                        // Updates the state for re-rendering the fields that have been updated.
                        setPaymentOptionState(inputDataCopy)
                    }

            }
            
        }

    }

    return (
    <Box>
        <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue={paymentOptions[0].id}
            sx = {{color: colors.textWhite, display: "flex"}}
        >
        {
            paymentOptions.map((paymentOption) => {

                return (
                        <div key={"container" + paymentOption.id} style={paymetOptionContainer}>
                            <FormControlLabel 
                                onChange={() => {setPaymentOptionDelay(paymentOption)} } 
                                value={paymentOption.id} 
                                control={<Radio sx={{color: colors.textWhite}} />} 
                                label={paymentOption.name} 
                            />
                        </div>
                )
            })
        }
        </RadioGroup>

        <FormControl>
        {
            paymentOptions.map((paymentOption) => {
                return (
                    <Collapse key={paymentOption.id} in={paymentOptionState ? paymentOptionState.id === paymentOption.id : undefined}>
                        <div style={{width: "100%"}}>
                            <h5>{paymentOption.description}</h5>
                            {paymentOption.input ? (
                                paymentOption.input.map((input) => {
                                    return (
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            key = {input.name}
                                            id={input.name}
                                            label={input.name}
                                            required
                                            fullWidth
                                            error={input.errorState}
                                            helperText={input.error.length >= 2 ? input.error : undefined }
                                            onChange={(e) => { setInput(paymentOption.id, input.name, e)}}
                                            type={input.type}
                                            sx={textFieldSX}
                                            InputLabelProps={{
                                                style: { color: '#fff', borderColor: "#fff" }, 
                                            }}
                                        />
                                    )
                                })
                            ): undefined }
                            
                        </div>
                    </Collapse>

                )
            })
        }
        </FormControl>

        <div onClick={testCard}>Test</div>

        </Box>
    );
}

const paymetOptionContainer: React.CSSProperties = {
    minWidth: "150px",
}

export default RenderPaymentOptions;
