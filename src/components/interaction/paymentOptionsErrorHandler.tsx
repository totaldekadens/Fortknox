import { PaymentOptions } from "../../data/paymentOptions";



// Function for validating the choosen fields.
export const validateFields = (paymentOptionState: PaymentOptions) => {

    if(paymentOptionState) {

        if(paymentOptionState.id === 3) {
            return paymentOptionState;
        }

        if(paymentOptionState.id === 2) {

                    // Copy of the input object from the state.
                const inputDataCopy = paymentOptionState;

                if(inputDataCopy.input) {

                    inputDataCopy.input.map((input) => {

                            // Checks for empty input value.
                        if( input.value === "" || input.value == " ") {

                            input.errorState = true;
                            input.error = "Vänligen fyll i detta fält.";
                            return input;

                            // Checks for special characters in the input value.
                        } else if( input.name === "cc-number" && !/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(input.value.toString())) {

                            input.errorState = true;
                            input.error = "Detta är inte ett giltigt kortnummer.";
                            return input;
                        } else if( input.name === "cc-exp" && !/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(input.value.toString()) ) {

                            console.log(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(input.value.toString()))
                            input.errorState = true;
                            input.error = "Vänligen ange utgångsdatumet som XXXX eller XX/XX";
                            return input;

                        } else if( input.name === "cc-csc" && input.value.toString().length != 3) {

                            input.errorState = true;
                            input.error = "Detta är inte ett giltigt CVC-nummer";
                            return input;
                        } else if( input.name === "cc-name" && input.value.toString().length < 3) {

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

                    return inputDataCopy;

                }
        }
        if(paymentOptionState.id === 1) {

                const inputDataCopy = paymentOptionState;

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

                    return inputDataCopy

                }

        }
        
    }

}