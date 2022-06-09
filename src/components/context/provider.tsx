import React, { useEffect } from "react"
import { FC, PropsWithChildren, useState } from "react"
import { Product, products } from "../../data/products"
import { inputData } from "../interaction/inputFieldsCart"
import { InputData } from "../interaction/inputFieldsCart"

interface Props {}


// ProductList
interface productContextData {
    deleteProduct: (product: Product) => void
    productList: Product[]
    setProductList: React.Dispatch<React.SetStateAction<Product[]>>
}

export const productContext = React.createContext<productContextData>({
    deleteProduct: (product: Product) => {},
    productList: products,
    setProductList: () => {}
})


const ProductListProvider:  FC<PropsWithChildren<Props>> = (props) => {

    const [productList, setProductList] = useState<Product[]> (products)

    // Updates productList - Vara i useeffect?
    const getProductList: () => void = () => {
        
        const getCurrentProductList = localStorage.getItem('productList')

        if(getCurrentProductList == "[]" || !getCurrentProductList) {
            localStorage.removeItem('productList')
        } 
        else {
            const currentProcuctList = JSON.parse(getCurrentProductList)
            setProductList(currentProcuctList)
        }
    }


    // Deletes product
    const deleteProduct = (productToRemove: Product) => {

        const filteredList = productList.filter( (product) => {
            if(productToRemove.id == product.id) {
                return false
            }
            return true
        } )
    
        setProductList(filteredList) 
        localStorage.setItem('productList', JSON.stringify(filteredList));
    }   

    const setProductListToLS: () => void = () => { 
        localStorage.setItem('productList', JSON.stringify(productList));
    }

    useEffect(() => {
        setProductListToLS();
        
    }, [productList])

    useEffect(() => {
        getProductList()

    }, [])


    return (
        <productContext.Provider value={{ productList, deleteProduct, setProductList}}>
            {props.children}
        </productContext.Provider>
    )
}





// Mediaquery från Victors exempel

export interface DeviceContextData {
    devices: Device
}

export interface Device {
    isDesktop: boolean,
    isTablet: boolean,
    isMobile: boolean
}

const DefaultContextData: Device = {
    isDesktop: true,
    isTablet: false,
    isMobile: false
}

export const DeviceContext = React.createContext<DeviceContextData>({
    devices: DefaultContextData, 
})

interface Props {}

export const DeviceProvider: FC<PropsWithChildren<Props>> = (props) => {

    const [devices, setDevices] = useState<Device>(DefaultContextData)

    useEffect(() => {

        const onWindowChange = () => {
            if((window.innerWidth > 1150)) {
                setDevices({ isDesktop: true, isTablet: false, isMobile: false })
            } else if((window.innerWidth <= 1150 && window.innerWidth > 700)) {
                setDevices({ isDesktop: false, isTablet: true, isMobile: false })
            } else if((window.innerWidth <= 700)) {
                setDevices({ isDesktop: false, isTablet: false, isMobile: true} )
            }
        }

        onWindowChange()

        window.addEventListener("resize", onWindowChange)

    }, [])

    useEffect(() => {
    },[devices])

    return (
        <DeviceContext.Provider value={{devices}}>
            {props.children}
        </DeviceContext.Provider>
    )
}




interface InvoiceContextData {
    getInputData: InputData[]
    setInputData: React.Dispatch<React.SetStateAction<InputData[]>>
}

export const invoiceContext = React.createContext<InvoiceContextData>({
    getInputData: inputData,
    setInputData: () => {}
})

export const InvoiceInfoProvider:  FC<PropsWithChildren<Props>> = (props) => {

    const [getInputData, setInputData] = useState(inputData);

    console.log(getInputData)

    useEffect(() => {

        if(!inputData) {

        }
        

    }, [getInputData])

    return (
        <invoiceContext.Provider value={{getInputData, setInputData}}>
            {props.children}
        </invoiceContext.Provider>
    )
}







export default ProductListProvider