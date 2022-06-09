import { CSSProperties, FC, useEffect, useState } from "react"
import { delivery } from "../../data/delivery"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { colors } from "../../data/color";
import SectionCartContainer from "../common/sectionCartContainer";

interface Props {}


const DeliveryPage: FC<Props> = (props) => {

    const [deliveryMethod, setDeliveryMethod] = useState<number | undefined>()


    const validateDeliveryMethod = (id: number) => {

        if(deliveryMethod) {
            return deliveryMethod;
        }

    }

    validateDeliveryMethod;

    useEffect(() => {
        setDeliveryMethod(delivery[0].id)
    }, [])

    return (
        <SectionCartContainer>
            <FormControl>
                <FormLabel sx={{color: colors.textWhite}} id="demo-radio-buttons-group-label">Val av leverans</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={delivery[0].title}
                    sx = {{color: colors.textWhite}}
                >
            {
                delivery.map((deliveryOption) => {
                    return (
                        <div key={"container" + deliveryOption.id}style={radioContainer}>
                            <FormControlLabel style={{width: "100%"}} onChange={() => {setDeliveryMethod(deliveryOption.id)} } key={deliveryOption.id} value={deliveryOption.title} control={<Radio sx={{color: colors.textWhite}} />} label={deliveryOption.title} />
                            <p key={deliveryOption.description}>{deliveryOption.description}</p>
                            <p key={deliveryOption.price}>Engångskostnad {deliveryOption.price} kr</p>
                        </div>
                    )
                })
            }
                </RadioGroup>
            </FormControl>
        </SectionCartContainer>
    )
}

export default DeliveryPage


const radioContainer: CSSProperties = {
    borderBottom: "1px solid lightgrey", 
    display: "flex", 
    justifyContent: "space-between", 
    flexWrap:"wrap", marginTop: "20px"
}