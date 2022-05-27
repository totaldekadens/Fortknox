import { CSSProperties, FC } from "react"
import { colors } from "../../data/color";
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

    return (
    <div style={{display: "flex", flexDirection: "column", width: "100%", alignItems: props.alignItems, textAlign: props.textAlign  }} > {/* Funkar även om det är rött. Men Varför?? Kolla med Victor  */}
        <Lines firstColor= {props.firstColor} secondColor={props.secondColor} margin= "100px 0px 0px 0px"/>
        <h1 style={{fontSize: "60px", color: colors.primary }}>{props.title}</h1>
    </div>
    )
}

export default ContentTitle