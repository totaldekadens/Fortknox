import { CSSProperties, FC, useContext } from "react"
import { Navigate, useParams } from "react-router-dom"
import { colors } from "../../data/color"
import { Product, products } from "../../data/products"
import Lines from "../common/lines"
import { DeviceContext, DeviceContextData, productContext } from "../context/provider"
import CartButton from "../interaction/cartButton"
import { sloganStyle} from "../pages/front"

interface Props {}

const ProductBanner: FC<Props> = (props) => {

    const { productId } = useParams()

    // Gets productContext
    const { productList } = useContext(productContext)
    const { devices } = useContext(DeviceContext)

    const foundProduct = productList.find((product) => Number(productId) == product.id)


    if (!foundProduct) {
        return <Navigate to="/" />
    }

    return (
            <div style={{ ...container({devices: devices}), color: colors.textWhite }}>
                <div style={{ ...row({devices: devices}), backgroundColor: colors.primary, padding: devices.isDesktop ? "0px 40px 40px 40px" : devices.isTablet ? "0px" : devices.isMobile ? "0px" : "0px", minWidth: 520 }}>

                    <div style={{...productIncludeCard, ...overlayInfo({devices: devices})}}>
                        {amountOfLinesByLenght(foundProduct)}
                        <div style={{}}>
                            <h1 style={devices.isTablet ? sloganStyle({devices: devices}) : devices.isMobile ? sloganStyle({devices: devices}) : undefined }>{foundProduct.name}</h1>
                            <h4 style={devices.isTablet ? textContainer({devices: devices}) : devices.isMobile ? textContainer({devices: devices}) : undefined }>{foundProduct.desc}</h4>
                        </div>

                        {foundProduct.including.map((include) => {

                            return (
                                <div key={include!.id} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                                    <h2 style={{ fontSize: devices.isMobile ? "20px" : devices.isTablet ? "21px" : "24px"}}>{include?.name}</h2>
                                    <h3 style={{ fontSize: devices.isMobile ? "13px" : "", marginTop: "20px"}}>(Ord.pris {include?.price} kr/mån)</h3>
                                </div>
                            )
                        })}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: devices.isTablet ? "20px" : devices.isMobile ? "20px" : "0px" }}>
                            <div >
                                <h4 style={{ margin: "0" }}>Från</h4>
                                <div style={{ display: "flex" }}>
                                    <h1 style={{ margin: "0", fontSize: devices.isTablet ? "50px" : devices.isMobile ? "40px" : "30px"}}>{foundProduct.price3mth} </h1>
                                    <h4>kr/mån</h4>
                                </div>
                            </div>
                            <CartButton product={foundProduct} paddingBtn={devices.isDesktop ? "" : devices.isTablet ? "30px 70px 30px 70px" : devices.isMobile ? "" : ""} />
                        </div>
                    </div>
                </div>
                <div style={row({devices: devices})}>
                    <img style={devices.isTablet ? bannerStyle({devices: devices}) : devices.isMobile ? bannerStyle({devices: devices}) : imgCover} src={foundProduct!.thumbnail} alt="" />
                </div>
            </div>
            )
}


function amountOfLinesByLenght(foundProduct: Product) {
    const { devices } = useContext(DeviceContext)

    if (foundProduct.including.length < 3) {
        return <Lines firstColor={colors.secondary} margin= {devices.isDesktop ? "50px 0px 0px 0px" : devices.isTablet ? "30px 0px 0px 0px" : devices.isMobile ? "20px 0px 0px 0px" : "50px 0px 0px 0px"} />
    } if (foundProduct.including.length < 4) {
        return <Lines firstColor={colors.secondary} secondColor={colors.third} margin= {devices.isDesktop ? "50px 0px 0px 0px" : devices.isTablet ? "30px 0px 0px 0px" : devices.isMobile ? "20px 0px 0px 0px" : "50px 0px 0px 0px"}  />
    } if (foundProduct.including.length < 5) {
        return <Lines firstColor={colors.secondary} secondColor={colors.third} thirdColor={colors.fourth} margin= {devices.isDesktop ? "50px 0px 0px 0px" : devices.isTablet ? "30px 0px 0px 0px" : devices.isMobile ? "20px 0px 0px 0px" : "50px 0px 0px 0px"}  />
    } else {
        return <h1>Something went wrong..</h1>
    }
}

const overlayInfo: (devices: DeviceContextData) => CSSProperties = (devices) => {
    
    if(devices.devices.isTablet || devices.devices.isMobile ) {
        return {
            position: "absolute", 
            top: 100, 
            zIndex: 1
        }
    }
    return {
        position: "relative", 
    }
}

const bannerStyle: (devices: DeviceContextData) => CSSProperties = (devices) =>  {

    return {
        width: "100%",
        minHeight: "100vh",
        position: 'relative',
        objectFit: "cover",
        filter: devices.devices.isTablet ? "brightness(60%)" : devices.devices.isMobile ? "brightness(40%)" : "brightness(60%)"
    }
}

const textContainer : (devices: DeviceContextData) => CSSProperties = (devices) =>  {

    return {
      width: devices.devices.isDesktop ? "50%" : devices.devices.isTablet ? "60%" : devices.devices.isMobile ? "80%" : "60%",
      fontSize: devices.devices.isDesktop ? "22px" : devices.devices.isTablet ? "18px" : devices.devices.isMobile ? "15px" : "22px"
    }
  }

const container: (devices: DeviceContextData) => CSSProperties = (devices) =>  {
    
    return {
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: devices.devices.isDesktop ? undefined : devices.devices.isTablet ? "column-reverse" : devices.devices.isMobile ? "column-reverse" : "column-reverse"
    }
}

const row: (devices: DeviceContextData) => CSSProperties = (devices) =>{
    
    return {
        width: devices.devices.isDesktop ? "50%" : devices.devices.isTablet ? "100%" : devices.devices.isMobile ? "100%" : "100%"
    }
}

const productIncludeCard: CSSProperties = {
    padding: "0 5%"
}

const imgCover: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover"
}

export default ProductBanner