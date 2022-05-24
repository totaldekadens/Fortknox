import { CSSProperties, FC } from "react"
import { colors } from "./../../data/color"

interface Props {}


export const ThreeLines: FC<Props> = (props) => {
    
    return (
    <div style={lineContainer}>
        <div style={{...lines, backgroundColor: colors.primary }}></div>
        <div style={{...lines, backgroundColor: colors.third }}></div> 
        <div style={{...lines, backgroundColor: colors.secondary }}></div>
    </div>
    )
}

export const TwoLines: FC<Props> = (props) => {
    return (
    <div style={lineContainer}>
        <div style={{...lines, backgroundColor: colors.third }}></div> 
        <div style={{...lines, backgroundColor: colors.secondary }}></div>
    </div>
    )
}

export const OneLine: FC<Props> = (props) => {
    return (
    <div style={lineContainer}>
        <div style={{...lines, backgroundColor: colors.third }}></div> 
    </div>
    )
}


const lineContainer: CSSProperties = {
    display: "flex",
    marginTop: "100px"
}

const lines : CSSProperties = {
    width: "150px", 
    height: "10px", 
    margin: "2px", 
    borderRadius: "10px"
}


