import { CSSProperties, FC, useContext } from "react"
import { icons, includings, Product, Integration, Accounting, Invoice, Salary, integration, products } from '../../data/products'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from "@mui/material/Button";
import { productContext } from "../context/provider";
import { DialogInfoWindow } from "../interaction/dialogs";
import InputTextFieldsAdmin from "../interaction/InputTextFieldsAdmin";
import InputFormControlAdmin from "../interaction/InputFormControlAdmin";
import errorLoop from "./errorHandler";

interface Props {
    product?: Product
    action?: string
}

const AddAndModifyProduct: FC<Props> = (props) => {

    // States
    const [nameInput, setName] = React.useState(props.product ? props.product!.name : '');
    const [descInput, setDesc] = React.useState(props.product ? props.product!.desc : '');
    const [price3, setPrice3] = React.useState(props.product ? props.product!.price3mth : 0);
    const [price12, setPrice12] = React.useState(props.product ? props.product!.price12mth : 0);
    const [icon, setIcon] = React.useState(props.product ? props.product!.icon : '');
    const [imageInput, setImage] = React.useState( '');
    const [message, setMessage] = React.useState('');
    const [includeInput, setIncludes] = React.useState<string[]>([]);
    let [newInclude, setNewInclude] = React.useState<[(Integration | undefined)?, (Accounting | undefined)?, (Invoice | undefined)?, (Salary | undefined)?, (null | undefined)?]>([undefined]);
    const [open, setOpen] = React.useState(false);
    const [titleColor, setColor] = React.useState("black");
    const [title, setTitle] = React.useState("Information");

    

    // Gets Context
    const { productList, getProductList } = useContext(productContext)

    // Updates fields when a package is selected
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

    // Error list // Fixa ett ordentligt interface
    const errorList: any[] = [
        {name: nameInput, error: false },
        {name: descInput, error: false },
        {name: imageInput, error: false },
        {name: icon, error: false },
        {name: price3, error: false },
        {name: price12, error: false },
        {name: includeInput, error: false },
    ]
    // Error state
    const [updatedErrorList, setErrorList] = React.useState(errorList);

    // Handle the click "Skapa" and "Ändra"  // TESTA SKAPA KOPIA OCH SE OM DET FUNGERAR (problem med att sätta statet med funktionen)
    const handleClickAddProduct = () => {

        // If "change" - set state to empty array
        let emptyArray : [(Integration | undefined)?, (Accounting | undefined)?, (Invoice | undefined)?, (Salary | undefined)?, (null | undefined)?] = [undefined]
        props.action == "change" ? newInclude = emptyArray : newInclude 

        // Sets new array with objects of includes from the string array of includes. 
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

        // Check errors
        const updatedList = errorLoop(errorList); 
        setErrorList(updatedList)

        const ascendProductList = descendProductList.sort((first, second) => 0 - (first.id > second.id ? -1 : 1))
        
        if(!nameInput || !descInput || !imageInput || !icon || !price3 || !price12 || newInclude[0] == undefined) {
            setOpen(true);
            setMessage("Alla fält måste vara ifyllda")
            setColor("red")
            setTitle("Ajajaj!")
            return
        }

        if(price3 < 1 || price12 < 1 ) {
            setOpen(true);
            setMessage("Pris måste vara större än 0 kr")
            return
        }

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
        setOpen(true);
        setColor("black")
        setTitle("Information")
        setMessage(props.action == "change" ? "Paket " + '"' + nameInput + '"' + " är nu uppdaterad" : "Paketet " + '"' + nameInput + '"' + " är nu skapat")
        
        // Clear fields
        setName(""); setDesc(""); setPrice3(0); setPrice12(0); setIcon(""); setImage(""); setNewInclude([undefined]);
    }
    
    return (
        <div>  
            {/* Package name, description & prices */}
            <InputTextFieldsAdmin updatedErrorList={updatedErrorList} setNameProp= {setName} setDescProp={setDesc} setPrice3Prop={setPrice3} setPrice12Prop={setPrice12} nameInputValue={nameInput} descInputValue={descInput} price3InputValue={price3} price12InputValue={price12} />
            {/* Includings */}
            <InputFormControlAdmin updatedErrorList={updatedErrorList} includeInput={includeInput} setIncludes={setIncludes} />

            {/* Icons */} 
            <div style={{display: "flex", alignItems: "center"}}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Ikon</InputLabel>
                    <Select required labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={icon} error={updatedErrorList[3]!.error} label="Icon" onChange={(event: SelectChangeEvent) => {setIcon(event.target.value)}}>
                        {icons.map((icon) => { return (
                            <MenuItem key={icon.src} value={icon.src}>{icon.name}</MenuItem> 
                        ) })}
                    </Select>
                </FormControl>
                <img style={{width: "40px"}} src= {icon} alt="" />
            </div>
            <div style={{display: "flex", alignItems: "center", marginTop: "7px", paddingLeft: "7px"}}>
                <TextField required id="outlined-textarea" label="URL-bild"  onChange={(event) => {setImage(event.target.value)}} value={imageInput} error={updatedErrorList[2].error}/>
                <img style={{width: "60px", marginLeft: "10px"}} src= {imageInput} alt="" />
            </div>
            <p style={helperText}>En bild skall dyka upp till höger om fältet när du klistrat in din URL</p>
            {/* Button */}
            <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "flex-end", marginTop: "25px"}}>
                <Button sx={{width: "180px", height: "60px"}} variant="outlined" onClick={() => { handleClickAddProduct() }} >{props.action == "change" ? "Ändra paket" : "Skapa paket"}</Button>
            </div>
            < DialogInfoWindow  title={title} color={titleColor} setOpen={setOpen} product={props.product!} open={open} message={message}/>
        </div>
    )
}

const helperText: CSSProperties = {
    color: "black",
    paddingLeft: "7px",
    fontSize: "9px"
}

export default AddAndModifyProduct