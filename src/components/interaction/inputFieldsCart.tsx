import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { CSSProperties, FC, useState } from "react";





interface Props {}


interface InputData {
    name: string,
    label: string,
    value: string,
    required: boolean,
    fullWidth: boolean,
    error: {},
    }


interface Error {

}

const inputData: InputData[] = [{
    name: "foretagsnamn",
    label: "Företagsnamn",
    value: "",
    required: true,
    fullWidth: true,
    error: {},
}, {
    name: "organisationsnummer",
    label: "Organisationsnummer",
    value: "",
    required: true,
    fullWidth: true,
    error: {},
}, {
    name: "fornamn",
    label: "Förnamn",
    value: "",
    required: true,
    fullWidth: false,
    error: {},
}, {
    name: "efternamn",
    label: "Efternamn",
    value: "",
    required: true,
    fullWidth: false,
    error: {},
}, {
    name: "faktureringsadress",
    label: "Faktureringsadress",
    value: "",
    required: true,
    fullWidth: true,
    error: {},
}, {
    name: "adressrad 2",
    label: "Adressrad 2",
    value: "",
    required: false,
    fullWidth: true,
    error: {},
}, {
    name: "postnummer",
    label: "Postnummer",
    value: "",
    required: true,
    fullWidth: false,
    error: {},
}, {
    name: "stad",
    label: "Stad",
    value: "",
    required: true,
    fullWidth: false,
    error: {},
}

]



const InputFieldsCart: FC<Props> = (props) => {

    const [errorCompanyName, setErrorCompanyName] = useState(false)

    const validateCompanyName = (event: { target: { value: string; }; }) => {
        (event.target.value === "") ? setErrorCompanyName(true) : setErrorCompanyName(false)
        console.log(event)
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
                onChange={() => {}} 
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