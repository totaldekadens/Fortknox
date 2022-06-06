import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, Radio, RadioGroup, TextField } from '@mui/material';
import { paymentOptions } from '../../data/paymentOptions';
import { colors } from '../../data/color';

function PaymentOptions() {
    const [paymentOptionState, setPaymentOptionState] = React.useState<number | undefined>();

    const setPaymentOptionDelay = (id: number) => {
        setPaymentOptionState(0);

        setTimeout(() => {
            setPaymentOptionState(id)
        }, 500)

    }

    const setPaymentOptionOnLoad = () => {
        !paymentOptionState ? setPaymentOptionState(paymentOptions[0].id): undefined
    }

    React.useEffect(() => {
        setPaymentOptionOnLoad();
    }, [])

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
                                onChange={() => {setPaymentOptionDelay(paymentOption.id)} } 
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
                    <Collapse key={paymentOption.id} in={paymentOptionState === paymentOption.id}>

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
                                            type={input.type}
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


export default PaymentOptions;
