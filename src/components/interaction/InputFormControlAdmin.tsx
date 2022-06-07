import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { FC } from "react"
import { icons} from "../../data/products";



interface Props {
    icon: string
    setIcon: React.Dispatch<React.SetStateAction<string>>
    updatedErrorList: any[]
}

const InputFormControlAdmin: FC<Props> = (props: Props) => {
    
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Ikon</InputLabel>
        <Select required labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={props.icon} error={props.updatedErrorList[3]!.error} label="Icon" onChange={(event: SelectChangeEvent) => {props.setIcon(event.target.value)}}>
            {icons.map((icon) => { return (
                <MenuItem key={icon.src} value={icon.src}>{icon.name}</MenuItem> 
            ) })}
        </Select>
    </FormControl>
    )
}

export default InputFormControlAdmin
