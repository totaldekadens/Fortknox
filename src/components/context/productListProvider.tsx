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


    // Sets productList to LS
    useEffect(() => {

        const setProductListToLS: () => void = () => { 

            if(productList != products) {
                localStorage.setItem('productList', JSON.stringify(productList));
            }
        }

        setProductListToLS();

    }, [productList])




    // Gets productList from LS and sets the state
    useEffect(() => {

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

    getProductList()

    }, [] )



    return (
        <productContext.Provider value={{ productList, deleteProduct, setProductList}}>
            {props.children}
        </productContext.Provider>
    )
}



export default ProductListProvider