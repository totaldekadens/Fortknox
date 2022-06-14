import { CSSProperties, FC, PropsWithChildren } from "react"
import { colors } from "../../data/color";



interface Props {
   
}


export const SectionCartContainer: FC<PropsWithChildren<Props>> = (props) => {

    return (
        <div style={{ ...container }}>
          {props.children}
        </div>
    )
}
const container: CSSProperties = {
    width: "100%",
    maxWidth: "1200px",
    backgroundColor: colors.bgCart, 
    borderRadius: "10px",
    padding: "2% 2%",
    color: "black"

}

export default SectionCartContainer