import React from "react"
import { FC, PropsWithChildren, useState } from "react"
import { Delivery } from "../../data/delivery"


interface Props {}

interface DeliveryContextData {
    deliveryInput: Delivery | undefined
    setDeliveryInput: React.Dispatch<React.SetStateAction<Delivery | undefined>>
}

export const deliveryContext = React.createContext<DeliveryContextData>({
    deliveryInput: undefined,
    setDeliveryInput: () => {}
})


const DeliveryProvider:  FC<PropsWithChildren<Props>> = (props) => {

    const [deliveryInput, setDeliveryInput] = useState<Delivery | undefined> ()

    return (
        <deliveryContext.Provider value={{deliveryInput, setDeliveryInput}}>
            {props.children}
        </deliveryContext.Provider>
    )
}



export default DeliveryProvider