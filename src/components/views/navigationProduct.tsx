/* navigationItem.tsx  */

import { Link } from 'react-router-dom';
import { FC } from "react"
import { Product } from '../../data/products'
import Button from '@mui/material/Button';


interface Props {
    product: Product
}

const NavigationProduct: FC<Props> = (props) => {

    return (
        <div>
        <Link style={{textDecoration: "none"}} to={`/${props.product.id}`}>
            <img style={{width: "200px", height: "200px", objectFit: "contain"}} src={props.product.image} />
            <div>
                <h1>{props.product.name}</h1>
            </div>
        </Link>
        <Button variant="outlined">Beställ</Button>
        </div>
    )
  }
  


  
  export default NavigationProduct