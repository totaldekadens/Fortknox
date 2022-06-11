import React, { CSSProperties, FC, useContext, useRef } from "react"
import ProductCard from "../product/productCard"
import { colors } from "../../data/color"
import Button from '@mui/material/Button';
import Lines from "../common/lines";
import ContentTitle from "../common/contentTitle";
import { productContext } from "../context/productListProvider";
import { DeviceContext, DeviceContextData} from "../context/mediaQueryProvider";

interface Props {}

const FrontPage: FC<Props> = (props) => {

  const { devices } = useContext(DeviceContext)
  const { productList } = useContext(productContext)

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
          <h1 style={sloganStyle({devices: devices})}>Lev din <span style={{color: colors.third}}>företagsdröm</span></h1>
          <div style={textContainer({devices: devices})}>
            <p>Oavsett vad framgång är för dig som företagare, hjälper vi dig att nå dit du vill. Vi har samlat allt du behöver för att starta, växa och utvecklas – på ett ställe.</p>
          </div>
          <Button onClick={executeScroll} sx={{color: "white", borderColor: "white", padding: "20px 30px 20px 30px", marginTop: "40px"}} variant="outlined">Gå till våra paket</Button>
        </div>
      </div>

      <div ref={myRef}  style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <ContentTitle title="Våra paket" textAlign= "center" alignItems="center" firstColor= {colors.third} secondColor= {colors.secondary}/>
        <div style={container2({devices: devices})}>
          {productList.map((product) => <ProductCard key={product.id} product={product} />)}
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
  minHeight: '100vh',
}

const container2:(devices: DeviceContextData) => CSSProperties = (devices) =>  {

  return {
    display: 'flex',
    justifyContent: "space-around",
    flexWrap: "wrap",
    minHeight: '70vh',
    marginBottom: '30px',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    gap: "1em",
    paddingTop: "16px",
    width: "90%"
  }
}

const bannerStyle: CSSProperties = {

    width: "100%",
    height: "100vh",
    position: 'relative',
    objectFit: "cover",
    filter: "brightness(70%)"
}

export const overlay: CSSProperties =  {
    padding: "8% 10% 0px 10%",
    position: 'absolute'
}

export const sloganStyle: (devices: DeviceContextData) => CSSProperties = (devices) => {
  
  return {
    fontSize: devices.devices.isDesktop ? "75px" : devices.devices.isTablet ? "65px" : devices.devices.isMobile ? "38px" : "38px"
  }
}

export const textContainer : (devices: DeviceContextData) => CSSProperties = (devices) =>  {

  return {
    width: devices.devices.isDesktop ? "50%" : devices.devices.isTablet ? "60%" : devices.devices.isMobile ? "70%" : "60%",
    fontSize: devices.devices.isDesktop ? "22px" : devices.devices.isTablet ? "22px" : devices.devices.isMobile ? "18px" : "22px"
  }
}
  
export default FrontPage