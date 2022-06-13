import React from "react"
import { FC, PropsWithChildren, useState } from "react"
import { PaymentOptions } from "../../data/paymentOptions"



interface Props {}

interface PaymentContextData {
    paymentOptionState: PaymentOptions | undefined
    setPaymentOptionState: React.Dispatch<React.SetStateAction<PaymentOptions | undefined>>
}

export const paymentContext = React.createContext<PaymentContextData>({
    paymentOptionState: undefined,
    setPaymentOptionState: () => {}
})


const PaymentProvider:  FC<PropsWithChildren<Props>> = (props) => {

    const [paymentOptionState, setPaymentOptionState] = useState<PaymentOptions | undefined> ()

    return (
        <paymentContext.Provider value={{paymentOptionState, setPaymentOptionState}}>
            {props.children}
        </paymentContext.Provider>
    )
}



export default PaymentProvider