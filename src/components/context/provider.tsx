import React, { useEffect } from "react"
import { FC, PropsWithChildren, useState } from "react"
import { Product, products } from "../../data/products"

interface Props {}


// ProductList
interface productContextData {
    deleteProduct: (product: Product) => void
    productList: Product[]
    getProductList: () => void
}

export const productContext = React.createContext<productContextData>({
    deleteProduct: (product: Product) => {},
    productList: products,
    getProductList: () => {}
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


    useEffect(() => {

        getProductList()

    }, [])


    return (
        <productContext.Provider value={{ productList, deleteProduct, getProductList}}>
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







export default ProductListProvider