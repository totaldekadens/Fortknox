import  { FC, useContext, useState } from "react"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { colors } from "../../data/color";
import { includings } from "./../../data/products"
import ProductDetailsAdmin from "../product/productDetailsAdmin";
import AddProduct from "../admin/addProduct";
import { productContext } from "../context/provider";
import { TabPanel, a11yProps } from "../admin/adminTemplatePart";



const AdminPanel : FC = () => { 
  
  // Gets product context
  const { deleteProduct, productList } = useContext(productContext)

  // State of what panel to be seen
  const [value, setValue] = React.useState(0);

  // Sets the state
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <div style={{height: "auto", padding: "0px 30px 0px 30px"}}>
        <h1 style={{color: colors.primary}} >Adminpanelen</h1>
        <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "auto" }}
        >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', width: "214px"}}
        >
            <Tab label="Skapa paket" {...a11yProps(0)} />
            <Tab label="Paket" {...a11yProps(1)} />
            <Tab label="Produkter" {...a11yProps(2)} />
          </Tabs>

            {/*WARNING! Cannot appear as a descendant of p-tag */}

            {/* Content in "Skapa paket" */}
            <TabPanel value={value} index={0}>
                <h2 style={{color: colors.primary}}>Skapa paket</h2>
                <AddProduct/>
            </TabPanel>

            {/* Content in "Paket" */}
            <TabPanel value={value} index={1}>
                <h2 style={{color: colors.primary}}>Paket</h2>
                <div style={{width: "100%"}}>
                    {productList.map((product => { return < ProductDetailsAdmin key={product.id} product={product} deleteProductProp={() => {deleteProduct(product) }}/> })) }
                </div>
            </TabPanel>

            {/* Content in "Produkter" */}
            <TabPanel value={value} index={2}>
                <h2 style={{color: colors.primary}}>Produkter</h2>
                <div style={{width: "100%"}}>
                    {includings.map((include => { return (
                    <h3 style={{color: "black"}} key={include.id}>{include.name}</h3>) })) }
                </div>
            </TabPanel>
        </Box>
    </div>
  )
}

export default AdminPanel