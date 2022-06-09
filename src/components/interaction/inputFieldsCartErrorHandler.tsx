
import { InputData } from "./../../data/invoice";


    // Function for checking for incorrected input.

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
        } else if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g.test(inputCopy.value)) {

            inputCopy.errorState = true;
            inputCopy.error = "Specialtecken är inte tillåtna i detta fält.";
            return inputCopy;

            // Checks for numbers in the fields that are not supposed to have numbers in the input value.
        } else if(inputCopy.name != "foretagsnamn" && input.name != "organisationsnummer" && input.name != "postnummer" && /([1-90])/g.test(inputCopy.value) ) {

            inputCopy.errorState = true;
            inputCopy.error = "Nummer är inte tillåtna i detta fält.";
            return inputCopy;

            // Checks the length of the input value on "postnummer".
        } else if(inputCopy.name === "postnummer" && inputCopy.value.length != 5) {

            inputCopy.errorState = true;
            inputCopy.error = "Vänligen fyll i fältet i följande format: XXXXX";
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

