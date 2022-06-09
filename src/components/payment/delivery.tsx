import { CSSProperties, FC, useContext, useEffect, useState } from "react"
import { Delivery, delivery } from "../../data/delivery"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { colors } from "../../data/color";
import SectionCartContainer from "../common/sectionCartContainer";
import { deliveryContext } from "../context/deliveryProvider";

interface Props {}


const DeliveryPage: FC<Props> = (props) => {

    const { deliveryInput, setDeliveryInput } = useContext(deliveryContext)


    useEffect(() => {
        setDeliveryInput(delivery[0])
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
                            <FormControlLabel style={{width: "100%"}} onChange={() => {setDeliveryInput(deliveryOption)} } key={deliveryOption.id} value={deliveryOption.title} control={<Radio sx={{color: colors.textWhite}} />} label={deliveryOption.title} />
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