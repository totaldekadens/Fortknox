import { CSSProperties, FC, useContext } from "react"
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
import { DeviceContext, productContext } from "../context/provider";

interface Props {
    product?: Product
    action?: string
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


// Todo 

// - Komprimera koden och lägg i moduler
// - Kolla typ på rad 87



const AddAndModifyProduct: FC<Props> = (props) => {

    // States
    const [nameInput, setName] = React.useState(props.product ? props.product!.name : '');
    const [descInput, setDesc] = React.useState(props.product ? props.product!.desc : '');
    const [price3, setPrice3] = React.useState(props.product ? props.product!.price3mth : 0);
    const [price12, setPrice12] = React.useState(props.product ? props.product!.price12mth : 0);
    const [icon, setIcon] = React.useState(props.product ? props.product!.icon : '');
    const [imageInput, setImage] = React.useState( '');
    let [newInclude, setNewInclude] = React.useState<[(Integration | undefined)?, (Accounting | undefined)?, (Invoice | undefined)?, (Salary | undefined)?, (null | undefined)?]>([undefined]);

    React.useEffect(() => {
        if(props.product) {
            setName(props.product.name);
            setDesc(props.product.desc);
            setPrice3(props.product.price3mth);
            setPrice12(props.product.price12mth);
            setIcon(props.product.icon);
            setImage(props.product.thumbnail!);
            setNewInclude(props.product.including);
        }
    }, [props.product])

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

    // Gets Context
    const { productList, getProductList } = useContext(productContext)
    const { devices } = useContext(DeviceContext)
    
    // Sets new/updated product - No validation applied at the moment
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
        
        // Creates new Id. Gets the latest created id to index 0
        const descendProductList = productList.sort((first, second) => 0 - (first.id > second.id ? 1 : -1))
        const newId = descendProductList[0].id + 1

        // Object of new/updated product
        const newProduct: Product = {
            id: props.product ? props.product.id : newId,
            name: nameInput,
            desc: descInput,
            thumbnail: imageInput,
            icon: icon,
            price3mth: price3,
            price12mth: price12,
            including: newInclude
        }

        const ascendProductList = descendProductList.sort((first, second) => 0 - (first.id > second.id ? -1 : 1))
        
        // Action if product exist - update, else - push
        if(props.product) {
            const updatedList = ascendProductList.map((updateProduct) => { 
                if(updateProduct.id == props.product!.id){
                    return newProduct
                }   
                else {
                    return updateProduct
                }
            })
            localStorage.setItem('productList', JSON.stringify(updatedList));
        }
        else {
            ascendProductList.push(newProduct)
            localStorage.setItem('productList', JSON.stringify(ascendProductList));
        }
        getProductList();
    }

    const handleClickAddProduct = () => {
        if(!nameInput || !descInput || !imageInput || !icon || !price3 || !price12 || !newInclude ) {
            alert("Alla fält måste vara ifyllda")
            return
        }

        if(price3 < 1 || price12 < 1 ) {
            alert("Pris måste vara större än 0 kr")
            return
        }

        setNewProduct(); 
        // Standardalert sålänge
        alert(props.action == "change" ? "Paketet " + '"' + nameInput + '"' + " med ID " + props.product!.id +" är nu uppdaterat" : "Paketet " + '"' + nameInput + '"' + " är skapat")

        // Clear fields
        setName("");
        setDesc("");
        setPrice3(0);
        setPrice12(0);
        setIcon("");
        setImage("");
        setNewInclude([undefined]);
    }

    return (
        <div>  
            {/* Package name, description prices */}
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: devices.isDesktop ? "400px" : devices.isTablet ? "400px" : devices.isMobile ? "90%" : "90%" },}} noValidate autoComplete="off">
                <div>
                    <TextField required id="outlined-required" label="Paketnamn" onChange={(event) => {setName(event.target.value)}} value={nameInput} /><br />
                    <TextField required id="outlined-multiline-static" label="Paketbeskrivning" multiline rows={4} onChange={(event) => {setDesc(event.target.value)}} value={descInput}/><br />
                    <TextField style={{width: "40%"}} required id="outlined-required" label="Pris 3 månader" onChange={(event) => {setPrice3(Number(event.target.value))}} value={price3} type={"number"} />
                    <TextField style={{width: "40%"}} required id="outlined-required" label="Pris 12 månader" onChange={(event) => {setPrice12(Number(event.target.value))}} value={price12} type={"number"} />
                </div>
            </Box>
                {/* Includings */}
            <FormControl sx={{ m: 1, width:  devices.isDesktop ? "400px" : devices.isTablet ? "400px" : devices.isMobile ? "90%" : "90%" }}>
                <InputLabel id="demo-multiple-checkbox-label">Komponenter</InputLabel>
                <Select required labelId="demo-multiple-checkbox-label" id="demo-multiple-checkbox" multiple value={includeInput} onChange={handleChange2} input={<OutlinedInput label="Tag" />} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>
                    {includings.map((include) => (
                        <MenuItem key={include!.id} value={include!.name}>
                            <Checkbox checked={includeInput.indexOf(include!.name) > -1} />
                            <ListItemText primary={include!.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Icons */} 
            <div style={{display: "flex", alignItems: "center"}}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Ikon</InputLabel>
                    <Select required labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={icon} label="Icon" onChange={(event: SelectChangeEvent) => {setIcon(event.target.value)}}>
                        {icons.map((icon) => { return (
                            <MenuItem key={icon.src} value={icon.src}>{icon.name}</MenuItem> 
                        ) })}
                    </Select>
                </FormControl>
                <img style={{width: "40px"}} src= {icon} alt="" />
            </div>
            <div style={{display: "flex", alignItems: "center", marginTop: "7px", paddingLeft: "7px"}}>
                <TextField required id="outlined-textarea" label="URL-bild"  onChange={(event) => {setImage(event.target.value)}} value={imageInput}/>
                <img style={{width: "60px", marginLeft: "10px"}} src= {imageInput} alt="" />
            </div>
            <p style={helperText}>En bild skall dyka upp till höger om fältet när du klistrat in din URL</p>
            {/* Button */}
            <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "flex-end", marginTop: "25px"}}>
                <Button sx={{width: "180px", height: "60px"}} variant="outlined" onClick={() => { handleClickAddProduct() }} >{props.action == "change" ? "Ändra paket" : "Skapa paket"}</Button>
            </div>
        </div>
    )
}


const helperText: CSSProperties = {
    color: "black",
    paddingLeft: "7px",
    fontSize: "9px"
}

export default AddAndModifyProduct