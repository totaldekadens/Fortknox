import { FC, useContext } from "react"
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { productContext } from "../context/provider";
import AddProduct from "./addProduct";

interface Props {}

const ChangeProduct: FC<Props> = (props) => {

    // Gets productContext
    const { productList } = useContext(productContext)

    const [selectedProduct, setSelectedProduct] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedProduct(event.target.value);
    };

    const getSelectedProductObj = productList.find(product => product.id == Number(selectedProduct))
    
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Välj paket</InputLabel>
                <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedProduct}
                label="Select Product"
                onChange={handleChange}
                >
                    {productList.map((product) => { return <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>})}
                </Select>
            </FormControl>
            <AddProduct action="change" product={getSelectedProductObj}/>
        </div>
    )
}

export default ChangeProduct