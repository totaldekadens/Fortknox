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
    backgroundColor: colors.secondary,
    borderRadius: "10px",
    padding: "2% 4%"

}

export default SectionCartContainer