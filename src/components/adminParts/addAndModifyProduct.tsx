import { FC, useContext } from "react"
import { includings, Product, Integration, Accounting, Invoice, Salary } from '../../data/products'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { productContext } from "../context/productListProvider";
import { DialogInfoWindow } from "../interaction/dialogs";
import InputTextFieldsAdmin from "../interaction/InputTextFieldsAdmin";
import InputFormControlCheckAdmin from "../interaction/InputFormControlCheckAdmin";
import errorLoop, { checkImage, checkState } from "./errorHandler";
import InputFormControlAdmin from "../interaction/InputFormControlAdmin";

interface Props {
    product?: Product
    action?: string
}

export interface Error {
    name: string
    value: string | number| string[] | undefined
    error: boolean
}

const AddAndModifyProduct: FC<Props> = (props) => {

    // States product
    const [nameInput, setName] = React.useState('');
    const [descInput, setDesc] = React.useState('');
    const [price3, setPrice3] = React.useState(0);
    const [price12, setPrice12] = React.useState(0);
    const [icon, setIcon] = React.useState('');
    const [imageInput, setImage] = React.useState('');
    const [includeInput, setIncludes] = React.useState<string[]>([]);
    let [newInclude, setNewInclude] = React.useState<[(Integration | undefined)?, (Accounting | undefined)?, (Invoice | undefined)?, (Salary | undefined)?, (null | undefined)?]>([]);
    
    // States dialog window
    const [message, setMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [titleColor, setColor] = React.useState("black");
    const [title, setTitle] = React.useState("Information");

    const wimdowDialog: (setopen: boolean, message: string, color: string, title: string ) => void = (setopen, message, color, title) => {
        setOpen(setopen);
        setMessage(message)
        setColor(color)
        setTitle(title)
    }

    // Gets Context
    const { productList, setProductList } = useContext(productContext)

    // Updates fields when a package is selected
    React.useEffect(() => {
        if(props.product) {
            setName(props.product.name);
            setDesc(props.product.desc);
            setPrice3(props.product.price3mth);
            setPrice12(props.product.price12mth);
            setIcon(props.product.icon);
            setImage(props.product.thumbnail);
            setNewInclude(props.product.including);
        }
    }, [props.product])

    // Error list 
    const errorList: Error[] = [
        {name: "name", value: nameInput, error: false },
        {name: "desc", value: descInput, error: false },
        {name: "image", value: imageInput, error: false },
        {name: "icon", value: icon, error: false },
        {name: "price3", value: price3, error: false },
        {name: "price12", value: price12, error: false },
        {name: "include", value: includeInput, error: false },
    ]
    // Error state
    const [updatedErrorList, setErrorList] = React.useState<Error[]>(errorList);

    // Handle the click "Skapa" and "Ändra"  
    const handleClickAddProduct = () => {
        let newIncludeCopy : [(Integration | undefined)?, (Accounting | undefined)?, (Invoice | undefined)?, (Salary | undefined)?, (null | undefined)?] = [...newInclude]

        // If action = "change" - sets variable to empty array first
        let emptyArray : [(Integration | undefined)?, (Accounting | undefined)?, (Invoice | undefined)?, (Salary | undefined)?, (null | undefined)?] = []
        props.action == "change" ? newIncludeCopy = emptyArray : newIncludeCopy 

        // Sets new array with objects of includes from the string array of includes coming from select. 
        for (let i = 0; i < includeInput.length; i++) {
            const includeStringArray = includeInput[i];

            includings.map((includeObject) => { 

                if(includeObject!.name == includeStringArray) {

                    if(newIncludeCopy == undefined || newIncludeCopy[0] == null || newIncludeCopy.length < 1) {
                        emptyArray.push(includeObject)
                        newIncludeCopy = emptyArray  
                        newInclude = newIncludeCopy  // Cant set the state with function. Have to set the state it self.
                        setNewInclude(newIncludeCopy)
                    }   
                    else {
                        for (let i = 0; i < newIncludeCopy.length; i++) {
                            const newInc = newIncludeCopy[i];
                            
                            if(newInc?.id == includeObject!.id) {
                                return
                            }
                        }
                        newIncludeCopy.push(includeObject)
                        setNewInclude(newIncludeCopy)
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
        
        // Check errors
        const updatedList = errorLoop(errorList, productList); 
        setErrorList(updatedList)
        const result = checkState(newProduct, includeInput, productList)

        if(result.open) {
            wimdowDialog(result.open, result.message, result.color, result.title) 
            return
        }

        // Action if product already exists - update, else - push
        if(props.product) {
            const updatedList = ascendProductList.map((updateProduct) => { 
                if(updateProduct.id == props.product!.id){
                    return newProduct
                }   
                else {
                    return updateProduct
                }
            })
            // Updates localstorage with the correct productlist
                setProductList(updatedList)
        }
        else {
            ascendProductList.push(newProduct)
            setProductList(ascendProductList)
            localStorage.setItem('productList', JSON.stringify(productList)); // vill inte skickas till Provider och sätta det nya statet när denna sätts. Kör localstorage här sålänge.
        }

        // Sets the correct success message to window dialog
        wimdowDialog(true, props.action == "change" ? "Paket " + '"' + nameInput + '"' + " är nu uppdaterad" : "Paketet " + '"' + nameInput + '"' + " är nu skapat", "black", "Information!")

        // Clear fields
        setName(""); setDesc(""); setPrice3(0); setPrice12(0); setIcon(""); setImage(""); setNewInclude([undefined]);
    }
    
    return (
        <div>  
            <InputTextFieldsAdmin updatedErrorList={updatedErrorList} setNameProp= {setName} setDescProp={setDesc} setPrice3Prop={setPrice3} setPrice12Prop={setPrice12} nameInputValue={nameInput} descInputValue={descInput} price3InputValue={price3} price12InputValue={price12} />
            <InputFormControlCheckAdmin updatedErrorList={updatedErrorList} includeInput={includeInput} setIncludes={setIncludes} />
            <div style={{display: "flex", alignItems: "center"}}>
                <InputFormControlAdmin updatedErrorList={updatedErrorList} icon={icon} setIcon={setIcon} />
                <img style={{width: "40px"}} src= {icon} alt="" />
            </div>
            <div style={{display: "flex", alignItems: "center", marginTop: "7px", paddingLeft: "7px"}}>
                <TextField required id="outlined-textarea" label="URL-bild"  onChange={(event) => {setImage(event.target.value)}} value={imageInput} error={updatedErrorList[2]!.error}/>
                <img style={{width: "60px", marginLeft: "10px"}} src= {imageInput} alt="" />
            </div>
            <p style={{color: "black", paddingLeft: "7px", fontSize: "9px"}}>En bild skall dyka upp till höger om fältet när du klistrat in din URL, om inte så är formatet/sökvägen ej godkänd.</p>
            <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "flex-end", marginTop: "25px"}}>
                <Button sx={{width: "180px", height: "60px"}} variant="outlined" onClick={() => { handleClickAddProduct() }} >{props.action == "change" ? "Ändra paket" : "Skapa paket"}</Button>
            </div>
            < DialogInfoWindow  title={title} color={titleColor} setOpen={setOpen} product={props.product!} open={open} message={message}/>
        </div>
    )
}

export default AddAndModifyProduct