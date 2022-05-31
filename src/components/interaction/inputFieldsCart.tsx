import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { CSSProperties, FC, useState } from "react";

interface Props {}


interface InputData {
    name: string,
    label: string,
    required: boolean,
    fullWidth: boolean,
    // type: "number" | "string"
    value: string,
    error: {},
    }


interface Error {

    // Kolla om fältet är tomt
    // Kolla om fältet innehåller string eller number
    // 


}


const inputData: InputData[] = [
    {
        name: "foretagsnamn",
        label: "Företagsnamn",
        required: true,
        fullWidth: true,
        value: "",
        error: {},
    }, {
        name: "organisationsnummer",
        label: "Organisationsnummer",
        required: true,
        fullWidth: true,
        value: "",
        error: {},
    }, {
        name: "fornamn",
        label: "Förnamn",
        required: true,
        fullWidth: false,
        value: "",
        error: {},
    }, {
        name: "efternamn",
        label: "Efternamn",
        required: true,
        fullWidth: false,
        value: "",
        error: {},
    }, {
        name: "faktureringsadress",
        label: "Faktureringsadress",
        required: true,
        fullWidth: true,
        value: "",
        error: {},
    }, {
        name: "adressrad 2",
        label: "Adressrad 2",
        required: false,
        fullWidth: true,
        value: "",
        error: {},
    }, {
        name: "postnummer",
        label: "Postnummer",
        required: true,
        fullWidth: false,
        value: "",
        error: {},
    }, {
        name: "stad",
        label: "Stad",
        required: true,
        fullWidth: false,
        value: "",
        error: {},
    },
]



const InputFieldsCart: FC<Props> = (props) => {

    const [getInputData, setInputData] = useState(inputData)
    
        const setInput = (name: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    
            // Victor använde {...getValue}, varför?? Då får man ett extra objekt? 
            const inputDataCopy = getInputData;
    
            let inputValue = e.target.value
    
            // Finds the index of the input field that has changed.
            let index = inputDataCopy.findIndex(input => input.name === name)
    
            // Sets the value from the input field to the correct object.
            inputDataCopy[index].value = inputValue
    
            // Updates the state to the updated list of objects.
            setInputData(inputDataCopy)
    
        }

    // const chechError: (errorType: {}, value: string) => boolean = (errorType, value) => {
        
    // }

    // const inputOnChange = (inputData, key) => { 


    //     const inputDataCopy = {...inputData}


    // }


    return (
        <FormControl component="form" style= {{...container}}>
        {inputData.map((input) => {
            return (
                <TextField
                variant="outlined"
                margin="dense"
                key = {input.name}
                onChange={(e) => {setInput(input.name, e)}}
                id={input.name}
                label={input.label}
                fullWidth={ input.fullWidth ? true : false}
                style={!input.fullWidth ? inputHalf : undefined}
                required={input.required ? true : undefined}
                />
            )
        })}
        </FormControl>
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