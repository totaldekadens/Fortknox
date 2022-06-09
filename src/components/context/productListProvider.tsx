import React, { useEffect } from "react"
import { FC, PropsWithChildren, useState } from "react"
import { Product, products } from "../../data/products"

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



export default ProductListProvider