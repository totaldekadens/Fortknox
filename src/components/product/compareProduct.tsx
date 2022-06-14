import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { productDetailList, } from '../../data/products_old';
import { colors } from '../../data/color';
import { CSSProperties, FC } from 'react';
import CartButton from '../interaction/cartButton';
import ProductButton from '../interaction/toProductButton';
import { products } from '../../data/products';

interface Props {

}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&:nth-of-type(2).${tableCellClasses.head}`]: {
    backgroundColor: colors.secondary,
    color: theme.palette.common.white,
    fontSize: 24,
  },
  [`&:nth-of-type(3).${tableCellClasses.head}`]: {
    backgroundColor: colors.third,
    color: theme.palette.common.white,
    fontSize: 24,
  },
  [`&:nth-of-type(4).${tableCellClasses.head}`]: {
    backgroundColor: colors.secondary,
    color: theme.palette.common.white,
    fontSize: 24,
  },

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:th': {
    backgroundColor: "orange",
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

const headerTableCell = productDetailList.map((product) => {
 
  return <StyledTableCell key={product.name} align="center" >{product.name}</StyledTableCell>
})

const footerTableCell = products.map((products) => {
  return (
    <StyledTableCell key={products.name} align="center">
      {products.name}
      <CartButton product={products} paddingBtn={""} />
      <ProductButton product={products}/>
    </StyledTableCell>
  )
})

const ProductsCompare: FC<Props> = (props) => {
  return (

    <TableContainer component={Paper} style={{ display: "flex", justifyContent: "center", padding: "100px 0px" }}>

      <Table sx={{ minWidth: 700, maxWidth: 1000, boxShadow: 10 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {headerTableCell}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" style={{ ...firstColumn }}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center" style={{ ...secondColumn }}>{row.productBas}</StyledTableCell>
              <StyledTableCell align="center" style={{ ...thirdColumn }}>{row.productStandard}</StyledTableCell>
              <StyledTableCell align="center" style={{ ...fourthColumn }}>{row.productPlus}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {footerTableCell}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}

const firstColumn: CSSProperties = {
  backgroundColor: "white",
  color: "black",
  fontWeight: "bold",
  maxWidth: "300px",
  fontSize: 17,
}
const secondColumn: CSSProperties = {
  backgroundColor: colors.secondary,
  color: "white",
  fontSize: 17,
}
const thirdColumn: CSSProperties = {
  backgroundColor: colors.third,
  color: "white",
  fontSize: 17,
}
const fourthColumn: CSSProperties = {
  backgroundColor: colors.secondary,
  color: "white",
  fontSize: 17,
}

export default ProductsCompare