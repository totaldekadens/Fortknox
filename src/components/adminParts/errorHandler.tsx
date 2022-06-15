import { Product } from '../../data/products';
import { Error } from './addAndModifyProduct'

// Sets error on all fields thats not approved
const errorLoop = (errorList: Error[], productList: Product[], action: string | undefined) =>  {

    const copy =  errorList.map((item) => {

        const itemCopy = item

        const productName = productList.find((product) => product.name == itemCopy.value )

        // Checks for empty input value.
        if(itemCopy.value == "" || itemCopy.value == " ") {

            itemCopy.error = true;
            return itemCopy;
        }  
        // Checks if package name already exists
        else if(productName && !action) {
            itemCopy.error = true;
            return itemCopy;
        }
        // Checks if number is less than 1
        else if(typeof(itemCopy.value) == "number" && itemCopy.value < 1 ) {
            itemCopy.error = true;
            return itemCopy;
        } 
        // Checks image
        else if(itemCopy.name == "image") {
            
            // Checks if the url has the right ending 
            const result = checkImage(itemCopy.value as string)
            itemCopy.error = result
            return itemCopy;
        } 

        else {
            itemCopy.error = false;
            return itemCopy;
        }
    })

    return copy
}

export const checkImage: (url: string) => boolean = (url) => {

    if ([".jpg", ".png", ".JPEG", ".webp",".gif",".JPG", ".PNG",".WEBP", ".GIF", ".jpeg"].some(end => url.endsWith(end))) {

        return false

    } else {

        return true
    }
}

interface windowObject {
    open: boolean
    message: string
    color: string
    title: string
}

// Checks state, return right info to window dialog
export const checkState: (product: Product, includeInput : string[], productList: Product[], action: string | undefined ) => windowObject  = (product, includeInput, productList, action) => {

    const productName = productList.find((currentProduct) => currentProduct.name == product.name)

    if(!product.name || !product.desc || !product.thumbnail || !product.icon || !product.price3mth || !product.price12mth || product.including[0] == undefined || includeInput.length < 1) {
            
        return {open: true, message: "Alla fält måste vara ifyllda", color: "red", title: "Ajajaj!"} 
    }

    if(productName && !action) {
        return {open: true, message: "Paketnamnet existerar redan, var god välj ett nytt", color: "red", title: "Vilken otur!"} 
    }

    const checkURL = checkImage(product.thumbnail)

    if(checkURL) {
        return { open: true, message: "Kolla din URL till bilden. Filformatet är inte godkänt", color: "red", title: "Fel på URL"}
    } 

    if(product.price3mth < 1 || product.price12mth < 1 ) {
        return {open: true, message: "Priset måste vara större än 0 kr", color:"red" , title: "Ajajaj!"}
    }

    return {open: false, message: "", color:"" , title: "!"}

}


export default errorLoop