import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { products, } from '../../data/products';

interface Props {
  
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

/* products.map((product) => {
  
  product.including.map((x) => {
    
    {(x.fri_support.name)? console.log(x.fri_support.name):console.log("x.fri_support.name")}
  })
  if(!product.including[2] && !product.including[3]){
    
  }if(!product.including[3]){

  }
}) */

/* products.forEach(product => {
  if(product.id === 1){
    product.including.forEach(include => {
      if(include!.id === 2){
       console.log("include",include)
      if(!include?.fri_support ){
        return "x"
        
      } 
      }
    })
  }if(product.id === 2){

  }if(product.id === 3){

  }

}) */

function createData(
  name: string,
  productBas: string,
  productStandard: string,
  productPlus: string,
  
) {
  return { name, productBas, productStandard, productPlus };
}

const rows = [
  
  createData("Bokföring", "", "", ""),
  createData("Leverantörsregister", "✅", "✅", "✅"),
  createData("Leverantörsfakturor", "Obegränsat", "Obegränsat", "Obegränsat"),
  createData("Olika Rapporter", "✅", "✅", "✅"),
  createData("Tolkning av dokument", "från 4,90 kr/st", "från 4,90 kr/st", "från 4,90 kr/st"),
  

  createData("Intregration", "", "", ""),
  createData("Fri support", "Obegränsat", "Obegränsat", "Obegränsat"),
  createData("Molnbaserat", "✅", "✅", "✅"),
  createData("Fortknox App", "✅", "✅", "✅"),

  createData("Fakturering", "", "", ""),
  createData("Kundfakturor", "❌", "✅", "✅"),
  createData("Inbetalning", "❌", "✅", "✅"),
  createData("Påminnelsehantering", "❌", "✅", "✅"),
  createData("Fakturaservice", "❌", "från 4,90 kr/st", "från 4,90 kr/st"),
  createData("kundregister", "❌", "✅", "✅"),
  createData("Rapporter", "❌", "✅", "✅"),
  createData("Prislistor", "❌", "✅", "✅"),
 
  createData("Lön", "", "", ""),
  createData("Personalregister", "❌", "❌", "✅"),
  createData("Digitala lönebesked", "❌", "❌", "12 kr/st"),
  createData("När- och frånvaroregistrering", "❌", "❌", "✅"),
  createData("Semesterhantering", "❌", "❌", "✅"),
  createData("Statistikrapportering", "❌", "❌", "✅"),
  
];

/* const includes = products.including.map((include) => {
  include
})  */

const headerTableCell = products.map((product) => {
  return  <StyledTableCell key={product.name} align="center">{product.name}</StyledTableCell>
})

const footerTableCell = products.map((product) => {
  return (
    <StyledTableCell key={product.name} align="center">
    {product.name}
    </StyledTableCell>
  )
})



export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {headerTableCell}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell  component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.productBas}</StyledTableCell>
              <StyledTableCell align="center">{row.productStandard}</StyledTableCell>
              <StyledTableCell align="center">{row.productPlus}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {headerTableCell}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}