import { Box, TextField } from "@mui/material";
import { FC, useContext } from "react"
import { DeviceContext } from "../context/provider";

interface Props {
    setNameProp: React.Dispatch<React.SetStateAction<string>>
    setDescProp: React.Dispatch<React.SetStateAction<string>>
    setPrice3Prop: React.Dispatch<React.SetStateAction<number>>
    setPrice12Prop: React.Dispatch<React.SetStateAction<number>>
    nameInputValue: string
    descInputValue: string
    price3InputValue: number
    price12InputValue: number
    updatedErrorList: Error[]
}

export interface Error {
    name: string
    value: string | number| string[] | undefined
    error: boolean
}

const InputTextFieldsAdmin: FC<Props> = (props: Props) => {
    
    const { devices } = useContext(DeviceContext)

    return (
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: devices.isDesktop ? "400px" : devices.isTablet ? "400px" : devices.isMobile ? "90%" : "90%" },}} noValidate autoComplete="off">
            <div>
                <TextField required id="outlined-required" label="Paketnamn" onChange={(event) => {props.setNameProp(event.target.value)}} value={props.nameInputValue} error={props.updatedErrorList[0].error} /><br />
                <TextField required id="outlined-multiline-static" label="Paketbeskrivning" multiline rows={4} onChange={(event) => {props.setDescProp(event.target.value)}} value={props.descInputValue} error={props.updatedErrorList[1].error}/><br />
                <TextField style={{width: "40%"}} required id="outlined-required" label="Pris 3 månader" onChange={(event) => {props.setPrice3Prop(Number(event.target.value))}} value={props.price3InputValue} type={"number"} error={props.updatedErrorList[4].error} />
                <TextField style={{width: "40%"}} required id="outlined-required" label="Pris 12 månader" onChange={(event) => {props.setPrice12Prop(Number(event.target.value))}} value={props.price12InputValue} type={"number"} error={props.updatedErrorList[5].error} />
            </div>
        </Box>
    )
}

export default InputTextFieldsAdmin