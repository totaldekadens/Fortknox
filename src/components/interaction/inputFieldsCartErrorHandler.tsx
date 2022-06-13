
import { InputData } from "./../../data/invoice";


    // Function for checking for incorrect input.

const errorLoop = (getInputData: InputData[]) => {

    const inputDataCopy = getInputData.map((input) => {

        // Copy of the input object from the state.
        const inputCopy = {...input}

            // Checks for empty input value.
        if(inputCopy.required && inputCopy.value === "" || inputCopy.value == " ") {

            inputCopy.errorState = true;
            inputCopy.error = "Vänligen fyll i detta fält.";
            return inputCopy;

            // Checks for more than two consecutive spaces in the input value.
        } else if(inputCopy.required && /\s{2,}/g.test(inputCopy.value)) {

            inputCopy.errorState = true;
            inputCopy.error = "Vänligen ta bort onödiga mellanslag.";
            return inputCopy;

            // Checks for special characters in the input value.
        } else if( inputCopy.name != "email" && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g.test(inputCopy.value)) {

            inputCopy.errorState = true;
            inputCopy.error = "Specialtecken är inte tillåtna i detta fält.";
            return inputCopy;

            // Checks for numbers in the fields that are not supposed to have numbers in the input value.
        } else if(inputCopy.name != "organization" && input.name != "organisationsnummer" && input.name != "email "&& input.name != "phone" && inputCopy.name != "street-address" && input.name != "postnummer" && /([1-90])/g.test(inputCopy.value) ) {

            inputCopy.errorState = true;
            inputCopy.error = "Nummer är inte tillåtna i detta fält.";
            return inputCopy;

            // Checks the length of the input value on "postnummer".
        } else if(inputCopy.name === "phone" && !/^07([0-9][ -]*){7}[0-9]$/.test(input.value.toString())) {

            inputCopy.errorState = true;
            inputCopy.error = "Vänligen fyll i ett giltigt telefonnummer.";
            return inputCopy;

        } else if(inputCopy.name === "postnummer" && inputCopy.value.length != 5) {

            inputCopy.errorState = true;
            inputCopy.error = "Vänligen fyll i fältet i följande format: XXXXX";
            return inputCopy;

            // Checks if the user have inputed a valid formated email adress.
        } else if(inputCopy.name === "email" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value))) {

            inputCopy.errorState = true;
            inputCopy.error = "Vänligen fyll i fältet i en giltig e-postadress";
            return inputCopy;

            // Checks the length of the input value on "organisationsnummer".
        } else if (inputCopy.name === "organisationsnummer" && inputCopy.value.length != 10) {
            
            inputCopy.errorState = true;
            inputCopy.error = "Vänligen fyll i fältet i följande format: XXXXXXXXXX";
            return inputCopy;

            // Sets the error state to false since the field is filled out correctly.
        } else {

            inputCopy.errorState = false;
            inputCopy.error = "";
            return inputCopy;
        }
    })

        return inputDataCopy

}

export default errorLoop;

