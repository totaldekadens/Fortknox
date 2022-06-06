import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddAndModifyProduct from './addAndModifyProduct';
import { colors } from '../../data/color';
import { includings } from '../../data/products';
import ModifyProduct from './modifyProduct';
import ProductDetailsAdmin from '../product/productDetailsAdmin';
import { useContext } from 'react';
import { DeviceContext, productContext } from '../context/provider';


export default function SimpleAccordion() {

    const { productList } = useContext(productContext)
    const { devices } = useContext(DeviceContext)

    return (
        <div style={{minHeight: "100vh", padding: "0px 3% 3% 3%"}}>
            <h1 style={{color: colors.primary}} >Adminpanelen</h1>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Skapa paket</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <h2 style={{color: colors.primary}}>Skapa paket</h2>
                        <AddAndModifyProduct/>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Ändra paket</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <h2 style={{color: colors.primary}}>Ändra paket</h2>
                        <ModifyProduct/>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Paket</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <h2 style={{color: colors.primary}}>Paket</h2>
                        <div style={{width: "100%", color: "white"}}>
                            {productList.map((product => { return < ProductDetailsAdmin key={product.id} product={product}/> })) }
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Komponenter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{paddingBottom: "30px"}}>
                        <h2 style={{color: colors.primary}}>Komponenter</h2>
                        <div style={{width: "100%"}}>
                            {includings.map((include => { return (
                            <h3 style={{color: "black"}} key={include!.id}>{include!.name}</h3>) })) }
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
