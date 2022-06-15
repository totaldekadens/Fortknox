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

    const date = (time: number): string => {

        const today = new Date();
        const tomorrow = new Date();

        const options: Intl.DateTimeFormatOptions = { weekday: "short", year: "numeric", month: "long", day: "numeric" };

        tomorrow.setDate(today.getDate() + time);

        return tomorrow.toLocaleDateString("se-SE", options)

    }

    useEffect(() => {
        setDeliveryInput(delivery[0])
    }, [])

    return (
        <SectionCartContainer>
            <h1 style={{color: colors.primary}}>Välj leverans</h1>
            <FormControl style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    defaultValue={delivery[0].title}
                    sx = {{color: colors.primary}}
                >
            {
                delivery.map((deliveryOption) => {
                    return (
                        <div key={"container" + deliveryOption.id}style={radioContainer}>
                            <FormControlLabel 
                                style={{width: "100%"}} 
                                onChange={() => {setDeliveryInput(deliveryOption)} } 
                                key={deliveryOption.id} value={deliveryOption.title} 
                                control={<Radio sx={{color: colors.primary}} />} 
                                label={deliveryOption.title} 
                            />
                            <p style={{minWidth: "210px"}} key={deliveryOption.price}>Engångskostnad {deliveryOption.price} kr</p>
                            <p key={deliveryOption.description}>Leverans: {date(deliveryOption.numberOfDays)}</p>
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
    width: "100%",
    display: "flex", 
    justifyContent: "space-between", 
    flexWrap:"wrap",
    marginTop: "20px"
}