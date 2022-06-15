import { CSSProperties, FC, PropsWithChildren, useContext } from "react"
import { colors } from "../../data/color";
import { DeviceContext, DeviceContextData } from "../context/mediaQueryProvider";



interface Props {}


export const SectionCartContainer: FC<PropsWithChildren<Props>> = (props) => {

    const { devices } = useContext(DeviceContext)

    return (
        <div style={container({devices: devices})}>
            {props.children}
        </div>
    )
}
const container:(devices: DeviceContextData) => CSSProperties = (devices) => {

    return {
        width: "100%",
        maxWidth: "1200px",
        minWidth: "100px",
        backgroundColor: colors.bgCart, 
        borderRadius: devices.devices.isDesktop ? "10px" : "0px",
        padding: "10px",
        color: "black"
    }

}

export default SectionCartContainer