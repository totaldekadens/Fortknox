import { CSSProperties, FC } from "react"

interface Props {
    firstColor: string
    secondColor?: string
    thirdColor?: string
}


export const ThreeLines: FC<Props> = (props) => {
    
    return (
    <div style={lineContainer}>
        <div style={{...lines, backgroundColor: props.firstColor }}></div>
        <div style={{...lines, backgroundColor: props.secondColor }}></div> 
        <div style={{...lines, backgroundColor: props.thirdColor }}></div>
    </div>
    )
}

export const TwoLines: FC<Props> = (props) => {
    return (
    <div style={lineContainer}>
        <div style={{...lines, backgroundColor: props.firstColor }}></div>
        <div style={{...lines, backgroundColor: props.secondColor }}></div> 
    </div>
    )
}

export const OneLine: FC<Props> = (props) => {
    return (
    <div style={lineContainer}>
        <div style={{...lines, backgroundColor: props.firstColor }}></div>
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


