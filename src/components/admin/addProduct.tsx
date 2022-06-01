import { FC, CSSProperties, useState, FormEvent, useContext } from "react"
import { icons, includings, Product, Integration, Accounting, Invoice, Salary, integration, products } from '../../data/products'
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
import { SecurityRounded } from "@mui/icons-material";
import { productContext } from "../context/provider";

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

    // States
    const [nameInput, setName] = React.useState('');
    const [descInput, setDesc] = React.useState('');
    const [price3, setPrice3] = React.useState(0);
    const [price12, setPrice12] = React.useState(0);
    const [icon, setIcon] = React.useState('');
    let [newInclude, setNewInclude] = React.useState<[(Integration | undefined)?, (Accounting | undefined)?, (Invoice | undefined)?, (Salary | undefined)?, (null | undefined)?]>([undefined]);

    // Select includings - State
    const [includeInput, setIncludes] = React.useState<string[]>([]);
    const handleChange2 = (event: SelectChangeEvent<typeof includeInput>) => {
    const {
        target: { value },
    } = event;
    setIncludes(
        typeof value === 'string' ? value.split(',') : value,
    );
    };

    // Gets productContext
    const { productList, getProductList } = useContext(productContext)
    
    // Sets new product - No validation applied at the moment
    const setNewProduct: () => void = () => {

        // Creates an array of includes-objects from includeInput (string-array).
        for (let i = 0; i < includeInput.length; i++) {
            
            const includeStringArray = includeInput[i];
            
            includings.map((includeObject) => { 

                if(includeObject!.name == includeStringArray) {
 
                    if(newInclude == undefined || newInclude[0] == null ) {
                        newInclude = [includeObject]   // Check type
                        setNewInclude(newInclude)
                    }   
                    else {

                        for (let i = 0; i < newInclude.length; i++) {
                            const newInc = newInclude[i];
                            
                            if(newInc?.id == includeObject!.id) {
                                return
                            }
                        }
                        newInclude.push(includeObject)
                        setNewInclude(newInclude)
                    }
                }
            }) 
        }
        
        // Creates new Id
        const descendProductList = productList.sort((first, second) => 0 - (first.id > second.id ? 1 : -1))
        const newId = descendProductList[0].id + 1

        // Object of new product
        const newProduct: Product = {
            id: newId,
            name: nameInput,
            desc: descInput,
            icon: icon,
            price3mth: price3,
            price12mth: price12,
            including: newInclude
        }

        const ascendProductList = descendProductList.sort((first, second) => 0 - (first.id > second.id ? -1 : 1))

        ascendProductList.push(newProduct)
        localStorage.setItem('productList', JSON.stringify(ascendProductList));
        getProductList();

    }

    return (
        <div>  
            {/* package name and description */}
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '400px' },}} noValidate autoComplete="off">
                <div>
                    <TextField required id="outlined-required" label="Paketnamn" onChange={(event) => {setName(event.target.value)}} value={nameInput}/><br />
                    <TextField required id="outlined-textarea" label="Paketbeskrivning" rows={4} onChange={(event) => {setDesc(event.target.value)}} value={descInput}/>
                </div>
            </Box>
                
            <FormControl sx={{ m: 1, width: 400 }}>
                <InputLabel id="demo-multiple-checkbox-label">Komponenter</InputLabel>
                <Select
                required
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={includeInput}
                onChange={handleChange2}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                >
                {includings.map((include) => (
                    <MenuItem key={include!.id} value={include!.name}>
                        <Checkbox checked={includeInput.indexOf(include!.name) > -1} />
                        <ListItemText primary={include!.name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>

            {/* Prices */}           
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '200px' },}} noValidate autoComplete="off">
                <div>
                    <TextField required id="outlined-required" label="Pris 3 månader" onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {setPrice3(event.target.value)}} value={price3} type={"number"} /> {/* check error */}
                    <TextField required id="outlined-required" label="Pris 12 månader" onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {setPrice12(event.target.value)}} value={price12} type={"number"} /> {/* check error */}
                </div>
            </Box>

            {/* Icons */} 
            <div style={{display: "flex", alignItems: "center"}}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Ikon</InputLabel>
                    <Select
                    required
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={icon}
                    label="Icon"
                    onChange={(event: SelectChangeEvent) => {setIcon(event.target.value)}}
                    >
                        {icons.map((icon) => { return (
                            <MenuItem key={icon.src} value={icon.src}>{icon.name}</MenuItem> 
                        ) })}
                    </Select>
                </FormControl>
                <img style={{width: "40px"}} src= {icon} alt="" />
            </div>
            <p style={{color: "black"}}>Lägg till bild-input här sedan</p>

            {/* Button */}
            <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "flex-end"}}>
                <Button sx={{width: "180px", height: "60px"}} variant="outlined" onClick={() => {setNewProduct()}} >Skapa paket</Button>
            </div>
        </div>
    )
}




export default AddProduct