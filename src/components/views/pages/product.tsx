import { FC } from "react"
import { useParams, Navigate } from "react-router-dom";
import { products } from "../../../data/products";

interface Props {}


const ProductPage: FC<Props> = (props) => {
    
    const { productId } = useParams()

    const foundProduct = products.find((product) => Number(productId) == product.id)
    
    console.log(foundProduct)

    if(!foundProduct) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <img style={{width: "500px"}} src={foundProduct!.image} alt="" />
        </div>
    )
  }
  
  
  
  export default ProductPage