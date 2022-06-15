import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { CSSProperties, FC, useContext, useEffect, useState } from "react";
import { colors } from "../../data/color";
import { InputData } from "../../data/invoice";
import { invoiceContext } from "../context/invoiceProvider";

interface Props {

}

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

    const textFieldColor = colors.primary;
    const textFieldSX = {
        input: {
            "WebkitTextFillColor": `${textFieldColor} !important`,
            color: `${textFieldColor} !important`, 
        },
    };

    return (
        <>
        <h1 style={{color: colors.primary}}>Dina uppgifter</h1>
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
                value={input.value} 
                label={input.label}
                fullWidth={ input.fullWidth ? true : false}
                style={!input.fullWidth ? inputHalf : undefined}
                required={input.required ? true : undefined}
                type={input.type}
                sx={textFieldSX}
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
