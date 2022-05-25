import React, { CSSProperties, FC, useRef } from "react"
import { products } from "../../data/products"
import ProductCard from "../product/productCard"
import { colors } from "../../data/color"
import Button from '@mui/material/Button';
import Lines from "../common/lines";
import { display } from "@mui/system";



interface Props {}

const FrontPage: FC<Props> = (props) => {

  const myRef = useRef<HTMLInputElement>(null);

  const executeScroll = () => myRef!.current!.scrollIntoView({
    behavior: "smooth",
  }) 

  return (
    <>
      <div style={container}>
        <img style={bannerStyle} src= '/src/assets/banners/happy_restaurant_owners.png' alt="" /> {/* Försök importera denna istället */}
        <div style={overlay}>
          <Lines firstColor= {colors.primary} secondColor={colors.third} thirdColor={colors.secondary}/>
          <h1 style={sloganStyle}>Lev din <span style={{color: colors.third}}>företagsdröm</span></h1>
          <div style={textContainer}>
            <p>Oavsett vad framgång är för dig som företagare, hjälper vi dig att nå dit du vill. Vi har samlat allt du behöver för att starta, växa och utvecklas – på ett ställe.</p>
          </div>
          <Button onClick={executeScroll} sx={{color: "white", borderColor: "white", padding: "20px 30px 20px 30px", marginTop: "40px"}} variant="outlined">Beställ paket</Button>
        </div>
      </div>

      <div ref={myRef}  style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} >
          <Lines firstColor= {colors.third} secondColor={colors.secondary}/>
          <h1 style={{fontSize: "60px", color: colors.primary}}>Våra paket</h1>
        </div>
        <div style={container2}>
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        
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
  height: '100%',
}

const container2: CSSProperties = {
  display: 'flex',
  justifyContent: "space-around",
  flexWrap: "wrap",
  height: '70vh',
  margin: '0.5em',
  justifyItems: 'stretch',
  alignItems: 'stretch',
  gap: "1em",
  padding: "1em",
  width: "90%"

}

const bannerStyle: CSSProperties = {
  width: "100%",
  position: 'relative',
  objectFit: "contain",
  filter: "brightness(70%)"
}

const overlay: CSSProperties = {
  padding: "100px 0px 0px 100px",
  position: 'absolute',
}

const sloganStyle : CSSProperties = {
    fontSize: "75px"
}

const textContainer : CSSProperties = {
  width: "50%",
  fontSize: "22px"
}
  
export default FrontPage