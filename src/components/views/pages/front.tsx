import { CSSProperties, FC } from "react"
import { products } from "../../../data/products"
import NavigationProduct from "../navigationProduct"

interface Props {}

const FrontPage: FC<Props> = (props) => {

  console.log(products)

    return (
        <div style={container}>
            {products.map((product) => <NavigationProduct key={product.id} product={product} />)}
        </div>
    )
  }
  
  const container: CSSProperties = {
    display: 'flex',
    justifyContent: "space-around",
    flexWrap: "wrap",
    height: '100%',
    margin: '0.5em',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    gap: "1em",
    padding: "1em"
}
  
  export default FrontPage