import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { FC, useContext } from "react"
import { includings } from "../../data/products";
import { DeviceContext } from "../context/mediaQueryProvider";

interface Props {
    includeInput: string[]
    setIncludes: React.Dispatch<React.SetStateAction<string[]>>
    updatedErrorList: Error[]
}

interface Error {
    name: string
    value: string | number| string[] | undefined
    error: boolean
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
}; 

const InputFormControlCheckAdmin: FC<Props> = (props: Props) => {
    
    const { devices } = useContext(DeviceContext)

    const handleChange2 = (event: SelectChangeEvent<typeof props.includeInput>) => {
        const {
            target: { value },
        } = event;
        props.setIncludes(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
            <FormControl sx={{ m: 1, width:  devices.isDesktop ? "400px" : devices.isTablet ? "400px" : devices.isMobile ? "90%" : "90%" }} error={props.updatedErrorList ? props.updatedErrorList[6].error: false} >
                <InputLabel sx={{backgroundColor: "white" }} id="demo-multiple-checkbox-label">Komponenter</InputLabel>
                <Select required labelId="demo-multiple-checkbox-label" id="demo-multiple-checkbox" multiple value={props.includeInput} onChange={handleChange2} input={<OutlinedInput label="Tag" />} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>
                    {includings.map((include) => (
                        <MenuItem key={include!.id} value={include!.name}>
                            <Checkbox checked={props.includeInput.indexOf(include!.name) > -1} />
                            <ListItemText primary={include!.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
    )
}

export default InputFormControlCheckAdmin