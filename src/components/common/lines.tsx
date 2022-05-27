import { CSSProperties, FC } from "react"

interface Props {
    firstColor: string
    secondColor?: string
    thirdColor?: string
    margin?: string
}



export const Lines: FC<Props> = (props: Props) => {

    if(props.firstColor && !props.secondColor && !props?.thirdColor ) {
        return (
            <div style={{...lineContainer, margin: props.margin}}>
                <div style={{...lines, backgroundColor: props.firstColor }}></div>
            </div>
        )
    } else if(props.firstColor && props.secondColor && !props.thirdColor) {
        return (
            <div style={{...lineContainer, margin: props.margin}}>
                <div style={{...lines, backgroundColor: props.firstColor }}></div>
                <div style={{...lines, backgroundColor: props.secondColor }}></div> 
            </div>
        )
    } else if(props.firstColor && props.secondColor && props.thirdColor) {
        return (
            <div style={{...lineContainer, margin: props.margin}}>
                <div style={{...lines, backgroundColor: props.firstColor }}></div>
                <div style={{...lines, backgroundColor: props.secondColor }}></div> 
                <div style={{...lines, backgroundColor: props.thirdColor }}></div>
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

const lines : CSSProperties = {
    width: "150px", 
    height: "10px", 
    margin: "2px", 
    borderRadius: "10px"
}

export default Lines