import React from "react"
import { FC, PropsWithChildren, useState } from "react"
import { inputData } from "../../data/invoice"
import { InputData } from "../../data/invoice"

interface Props {}

interface InvoiceContextData {
    getInputData: InputData[]
    setInputData: React.Dispatch<React.SetStateAction<InputData[]>>
}

export const invoiceContext = React.createContext<InvoiceContextData>({
    getInputData: inputData,
    setInputData: () => {}
})

const InvoiceInfoProvider:  FC<PropsWithChildren<Props>> = (props) => {

    const [getInputData, setInputData] = useState(inputData);

    return (
        <invoiceContext.Provider value={{getInputData, setInputData}}>
            {props.children}
        </invoiceContext.Provider>
    )
}


export default InvoiceInfoProvider
