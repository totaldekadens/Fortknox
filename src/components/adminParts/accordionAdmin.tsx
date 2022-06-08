import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddAndModifyProduct from './addAndModifyProduct';
import { colors } from '../../data/color';
import { includings } from '../../data/products';
import ModifyProduct from './modifyProduct';
import ProductDetailsAdmin from '../product/productDetailsAdmin';
import { CSSProperties, useContext } from 'react';
import { productContext } from '../context/provider';

export default function SimpleAccordion() {

    const { productList } = useContext(productContext)

    return (
        <div style={{minHeight: "100vh", padding: "0px 3% 3% 3%", display: "flex", flexDirection: "column"}}>
            <h1 style={{color: colors.primary}} >Adminpanelen</h1>
                
                <Accordion sx={{marginTop: "30px"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <div style={fontStyle} >Skapa paket</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            
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
                    <div style={fontStyle}>Ändra paket</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
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
                    <div style={fontStyle}>Paket</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
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
                    <div style={fontStyle}>Komponenter</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{paddingBottom: "30px"}}>
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

const fontStyle: CSSProperties = {
    fontSize: "22px", 
    fontFamily: "Helvetica",
    padding: "10px 0px 10px 0px"
}
