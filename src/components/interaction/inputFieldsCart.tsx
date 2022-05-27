import TextField from "@mui/material/TextField";
import { CSSProperties, FC } from "react";





interface Props {}



const InputFieldsCart: FC<Props> = (props) => {

    return (
        <div style={container}>
            <TextField required id="outlined-basic" label="Företagsnamn" variant="outlined" fullWidth />
            <TextField required id="outlined-basic" label="Organisationsnummer" variant="outlined" fullWidth />
            <TextField required id="outlined-basic" label="Förnamn" variant="outlined" style= {inputHalf} />
            <TextField required id="outlined-basic" label="Efternamn" variant="outlined" style= {inputHalf} />
            <TextField required id="outlined-basic" label="Gatuadress" variant="outlined" fullWidth />
            <TextField id="outlined-basic" label="Adressrad 2" variant="outlined" fullWidth />
            <TextField required id="outlined-basic" label="Postnummer" variant="outlined" style= {inputHalf} />
            <TextField required id="outlined-basic" label="Stad" variant="outlined" style= {inputHalf} />
        </div>
    );





}

export default InputFieldsCart;


const container: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "90%",
    marginTop: "20px",
    justifyContent: "center",
}

const inputHalf: CSSProperties = {
    width: "50%",
}