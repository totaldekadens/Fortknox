import { CSSProperties, FC, useContext } from "react"
import { colors } from "../../data/color";
import { DeviceContext } from "../context/provider";
import Lines from "./lines";


interface Props {
    title: string
    textAlign: string
    alignItems?: string
    firstColor: string
    secondColor: string
    margin?: string
}


const ContentTitle: FC<Props> = (props) => {

    const { devices } = useContext(DeviceContext)

    return (
    <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: props.alignItems, textAlign: props.textAlign  }} > {/* Funkar även om det är rött. Men Varför?? Kolla med Victor  */}
        <Lines firstColor= {props.firstColor} secondColor={props.secondColor} margin= {devices.isDesktop ? "60px 0px 0px 0px" : devices.isTablet ? "60px 0px 0px 0px" : devices.isMobile ? "50px 0px 0px 0px" : "100px 0px 0px 0px"}/>
        <h1 style={{fontSize: devices.isDesktop ? "60px" : devices.isTablet ? "60px" : devices.isMobile ? "50px" : "60px", padding: "0% 10% 0% 10%" , color: colors.primary }}>{props.title}</h1>
    </div>
    )
}

export default ContentTitle