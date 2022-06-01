import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { CSSProperties, FC, useState } from "react";

interface Props {}


interface InputData {
    name: string,
    label: string,
    required: boolean,
    fullWidth: boolean,
    type: "number" | "text",
    // selectedError
    value: string,
    error: string,
    errorState: boolean
}

// inputData (fields) that will be rendered on the cart page.
const inputData: InputData[] = [
    {
        name: "foretagsnamn",
        label: "Företagsnamn",
        required: true,
        fullWidth: true,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "organisationsnummer",
        label: "Organisationsnummer",
        required: true,
        fullWidth: true,
        type: "number",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "fornamn",
        label: "Förnamn",
        required: true,
        fullWidth: false,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "efternamn",
        label: "Efternamn",
        required: true,
        fullWidth: false,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "faktureringsadress",
        label: "Faktureringsadress",
        required: true,
        fullWidth: true,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "adressrad 2",
        label: "Adressrad 2",
        required: false,
        fullWidth: true,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "postnummer",
        label: "Postnummer",
        required: true,
        fullWidth: false,
        type: "number",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "postort",
        label: "Postort",
        required: true,
        fullWidth: false,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    },
]



const InputFieldsCart: FC<Props> = (props) => {

    const [getInputData, setInputData] = useState(inputData);
    

    // Sets the input value to the state.
    const setInput = (name: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {

        // Copy of the inputData array from the state.
        const inputDataCopy = [...getInputData];

        let inputValue = e.target.value;

        // Finds the index of the input field that has changed.
        let index = inputDataCopy.findIndex(input => input.name === name);

        // Sets the value from the input field to the correct object.
        inputDataCopy[index].value = inputValue;

        // Updates the state to the updated list of objects.
        setInputData(inputDataCopy);

    }

    // Function for checking for incorrected input.
    const errorLoop = () => {

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

        // Updates the state for re-rendering the fields that have been updated.
        setInputData(inputDataCopy)

    }

    return (
        <>
        <FormControl component="form" style= {{...container}}>
        {getInputData.map((input: InputData) => {
            return (
                <TextField
                variant="outlined"
                margin="dense"
                key = {input.name}
                id={input.name}
                error={input.errorState}
                helperText={input.error.length >= 2 ? input.error : undefined }
                onChange={(e) => {setInput(input.name, e)}}
                label={input.label}
                fullWidth={ input.fullWidth ? true : false}
                style={!input.fullWidth ? inputHalf : undefined}
                required={input.required ? true : undefined}
                type={input.type}
                />
            )
        })}
        </FormControl>
        <div onClick={errorLoop}>test</div>
        </>
    );
}

export default InputFieldsCart;

const container: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    marginTop: "20px",
    flexDirection: "row",
    margin: "normal",
    justifyContent: "center",
    gap: "2%",
}

const inputHalf: CSSProperties = {
    width: "49%",
}