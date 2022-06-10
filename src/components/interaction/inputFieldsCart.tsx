import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { CSSProperties, FC, useContext, useEffect, useState } from "react";
import { InputData } from "../../data/invoice";
import { invoiceContext } from "../context/invoiceProvider";


interface Props {
    setStatusButton: React.Dispatch<React.SetStateAction<string>>
}


/* export interface InputData {
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
export const inputData: InputData[] = [
    {
        name: "organization",
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
        name: "fname",
        label: "Förnamn",
        required: true,
        fullWidth: false,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "lname",
        label: "Efternamn",
        required: true,
        fullWidth: false,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "street-address",
        label: "Faktureringsadress",
        required: true,
        fullWidth: true,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "address-line2",
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
        name: "address-level1",
        label: "Postort",
        required: true,
        fullWidth: false,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    },
] */


const InputFieldsCart: FC<Props> = (props) => {

    const { getInputData, setInputData } = useContext(invoiceContext)

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
                value={input.value} // Lade till denna för då vet vi för tillfället vad statet innehåller
                label={input.label}
                fullWidth={ input.fullWidth ? true : false}
                style={!input.fullWidth ? inputHalf : undefined}
                required={input.required ? true : undefined}
                type={input.type}
                />
            )
        })}
        </FormControl>
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