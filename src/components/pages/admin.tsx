import  { FC } from "react"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { colors } from "../../data/color";
import {products, includings} from "./../../data/products"
import ProductDetailsAdmin from "../product/productDetailsAdmin";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Props {}



function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}



export function VerticalTabs() {

  const [value, setValue] = React.useState(0);

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
            <Tab label="Ändra paket" {...a11yProps(1)} />
            <Tab label="Ta bort paket" {...a11yProps(2)} />
            <Tab label="Paket" {...a11yProps(3)} />
            <Tab label="Produkter" {...a11yProps(4)} />
            </Tabs>
            {/* Kan inte nesta h3 i en p-tag - Samma som Hugo fick */}
            <TabPanel value={value} index={0}>
                <h2 style={{color: colors.primary}}>Skapa paket</h2>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h2 style={{color: colors.primary}}>Ändra paket</h2>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <h2 style={{color: colors.primary}}>Ta bort paket</h2>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <h2 style={{color: colors.primary}}>Paket</h2>
                <div style={{width: "100%"}}>
                    {products.map((product => { return < ProductDetailsAdmin key={product.id} product={product}/> })) }
                </div>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <h2 style={{color: colors.primary}}>Produkter</h2>
                <div style={{width: "100%"}}>
                    {includings.map((include => { return (
                    <h3 style={{color: "black"}} key={include.id}>{include.name}</h3>) })) }
                </div>
            </TabPanel>
        </Box>
    </div>
  );
}



