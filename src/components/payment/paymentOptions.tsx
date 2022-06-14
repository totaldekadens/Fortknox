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
        setPaymentOptionState(paymentOptions[0])
    }

    React.useEffect(() => {
        setPaymentOptionOnLoad();
    }, [])

    const textFieldColor = colors.primary;
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

    return (
    <Box>
        <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue={paymentOptions[0].id}
            sx = {{color: colors.primary, display: "flex"}}
        >
        {
            paymentOptions.map((paymentOption) => {

                return (
                        <div key={"container" + paymentOption.id} style={paymetOptionContainer}>
                            <FormControlLabel 
                                onChange={() => {setPaymentOptionDelay(paymentOption)} } 
                                value={paymentOption.id} 
                                control={<Radio sx={{color: colors.primary}} />} 
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
                            <h5 style={{color: colors.primary}}>{paymentOption.description}</h5>
                            {paymentOption.input ? (
                                paymentOption.input.map((input) => {
                                    return (
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            key = {input.name}
                                            id={input.name}
                                            label={input.label}
                                            required
                                            fullWidth
                                            error={input.errorState}
                                            helperText={input.error.length >= 2 ? input.error : undefined }
                                            onChange={(e) => { setInput(paymentOption.id, input.name, e)}}
                                            type={input.type}
                                            sx={textFieldSX}
                                            InputLabelProps={{
                                                style: { color: colors.primary}, 
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

        </Box>
    );
}

const paymetOptionContainer: React.CSSProperties = {
    minWidth: "150px",
}

export default RenderPaymentOptions;
