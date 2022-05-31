import React, { useEffect } from "react"
import { FC, PropsWithChildren, useState } from "react"
import { Product, products } from "../../data/products"

interface Props {}

interface productContextData {
    deleteProduct: (product: Product) => void
    productList: Product[]
}

export const productContext = React.createContext<productContextData>({
    deleteProduct: (product: Product) => {},
    productList: products
})





const Provider:  FC<PropsWithChildren<Props>> = (props) => {

    const [productList, setProductList] = useState<Product[]> (products)


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
        <productContext.Provider value={{ productList, deleteProduct}}>
            {props.children}
        </productContext.Provider>
    )
}



export default Provider