import { FC, CSSProperties } from "react"
import { icons, includings, Product } from '../../data/products'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";



// Inputs ej klara. Bara upplagda i princip. 



interface Props {}

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




const AddProduct: FC<Props> = (props) => {

    // paketnamn och beskrivning
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };


    // Select includings
    const [include, setIncludes] = React.useState<string[]>([]);

    const handleChange2 = (event: SelectChangeEvent<typeof include>) => {
    const {
        target: { value },
    } = event;
    setIncludes(
        typeof value === 'string' ? value.split(',') : value,
    );
    };


    // Ikoner
    const [icon, setIcon] = React.useState('');

    const handleChange3 = (event: SelectChangeEvent) => {
        setIcon(event.target.value);
    };

    return (
        <div>  
            {/* paketnamn och beskrivning */}
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '400px' },}} noValidate autoComplete="off">
                <div>
                    <TextField required id="outlined-required" label="Paketnamn" defaultValue="" /><br />
                    <TextField required id="outlined-textarea" label="Paketbeskrivning" defaultValue="" rows={4} />
                </div>
            </Box>
                
            {/* Select includings- Funkar inte hundra i selecten just nu */}
            <FormControl sx={{ m: 1, width: 400 }}>
                <InputLabel id="demo-multiple-checkbox-label">Komponenter</InputLabel>
                <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={include}
                onChange={handleChange2}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {includings.map((include) => (
                    <MenuItem key={include.id} value={include.name}>
                        <Checkbox checked={include.name.indexOf(include.name) > -1} />
                        <ListItemText primary={include.name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>

            {/* Priser */}           
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '200px' },}} noValidate autoComplete="off">
                <div>
                    <TextField required id="outlined-required" label="Pris 3 månader" defaultValue="" type={"number"} />
                    <TextField required id="outlined-required" label="Pris 12 månader" defaultValue="" type={"number"} />
                </div>
            </Box>


            {/* Ikoner */} 
            <div style={{display: "flex", alignItems: "center"}}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Ikon</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={icon}
                    label="Icon"
                    onChange={handleChange3}
                    >
                        {icons.map((icon) => { return (
                            <MenuItem key={icon.src} value={icon.src}>{icon.name}</MenuItem> 
                        ) })}
                    </Select>
                </FormControl>
                <img style={{width: "40px"}} src= {icon} alt="" />
            </div>
            <p style={{color: "black"}}>Lägg till bild-input här sedan</p>
            <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "flex-end"}}>
                <Button sx={{width: "180px", height: "60px"}} variant="outlined">Skapa paket</Button>
            </div>
        </div>
    )
}


export default AddProduct