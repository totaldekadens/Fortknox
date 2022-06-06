import { CSSProperties, FC, useContext } from "react"
import { DeviceContext, DeviceContextData } from "../context/provider"

interface Props {
    firstColor: string
    secondColor?: string
    thirdColor?: string
    margin?: string
}



export const Lines: FC<Props> = (props: Props) => {

    const { devices } = useContext(DeviceContext)

    if(props.firstColor && !props.secondColor && !props?.thirdColor ) {
        return (
            <div style={{...lineContainer, margin: props.margin}}>
                <div style={{...lines({devices: devices}), backgroundColor: props.firstColor }}></div>
            </div>
        )
    } else if(props.firstColor && props.secondColor && !props.thirdColor) {
        return (
            <div style={{...lineContainer, margin: props.margin}}>
                <div style={{...lines({devices: devices}), backgroundColor: props.firstColor }}></div>
                <div style={{...lines({devices: devices}), backgroundColor: props.secondColor }}></div> 
            </div>
        )
    } else if(props.firstColor && props.secondColor && props.thirdColor) {
        return (
            <div style={{...lineContainer, margin: props.margin}}>
                <div style={{...lines({devices: devices}), backgroundColor: props.firstColor }}></div>
                <div style={{...lines({devices: devices}), backgroundColor: props.secondColor }}></div> 
                <div style={{...lines({devices: devices}), backgroundColor: props.thirdColor }}></div>
            </div>
        )
    } else {
        return (
            <h1>Något gick fel..</h1>
        )
    }

}


const lineContainer: CSSProperties = {
    display: "flex",
}

const lines: (devices: DeviceContextData) => CSSProperties = (devices) => {
    
    return {
        width: devices.devices.isDesktop ? "150px" : devices.devices.isTablet ? "120px" : devices.devices.isMobile ? "80px" : "120px",
        height: "10px", 
        margin: "2px", 
        borderRadius: "10px"
    }
}

export default Lines