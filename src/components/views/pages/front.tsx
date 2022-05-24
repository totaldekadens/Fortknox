import { CSSProperties, FC } from "react"
import { products } from "../../../data/products"
import NavigationProduct from "../navigationProduct"
import { colors } from "./../../../data/color"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Props {}

const FrontPage: FC<Props> = (props) => {

  console.log(products)

    return (
        <>
        <div style={container}>
          <img style={bannerStyle} src= '/src/assets/banners/happy_restaurant_owners.png' alt="" /> {/* Försök inportera denna istället */}
          <div style={overlay}>
            <div style={lineContainer}>
              <div style={{...lines, backgroundColor: colors.primary }}></div>
              <div style={{...lines, backgroundColor: colors.third }}></div> 
              <div style={{...lines, backgroundColor: colors.secondary }}></div>
            </div>
            <h1 style={sloganStyle}>Lev din <span style={{color: colors.third}}>företagsdröm</span></h1>
            <div style={textContainer}>
              <p>Oavsett vad framgång är för dig som företagare, hjälper vi dig att nå dit du vill. Vi har samlat allt du behöver för att starta, växa och utvecklas – på ett ställe.</p>
            </div>
            <Button sx={{color: "white", borderColor: "white", padding: "20px 30px 20px 30px", marginTop: "40px"}} variant="outlined">Beställ paket</Button>
          </div>
        </div>
        <div style={container2}>
        {products.map((product) => <NavigationProduct key={product.id} product={product} />)}
        </div>
        </>
    )
  }
  
  const container: CSSProperties = {
    display: 'flex',
    position: 'relative',
    justifyContent: "flex-start",
    alignContent: "flex-start",
    flexWrap: "wrap",
    height: '100vh',
}

const container2: CSSProperties = {
  display: 'flex',
  justifyContent: "space-around",
  flexWrap: "wrap",
  height: '100vh',
  margin: '0.5em',
  justifyItems: 'stretch',
  alignItems: 'stretch',
  gap: "1em",
  padding: "1em",
  backgroundColor: colors.primary
}

const bannerStyle: CSSProperties = {
  width: "100%",
  position: 'relative',
  objectFit: "contain",
  filter: "brightness(70%)"

}

const overlay: CSSProperties = {
  width: "100%",
  margin: "100px 0px 0px 100px",
  position: 'absolute',
}

const lineContainer: CSSProperties = {
  display: "flex"

}

const lines : CSSProperties = {
  width: "150px", 
  height: "10px", 
  margin: "2px", 
  borderRadius: "10px"
}


const sloganStyle : CSSProperties = {
    fontSize: "75px"
}

const textContainer : CSSProperties = {
  width: "50%",
  fontSize: "22px"
}
  
  export default FrontPage