import { useContext } from "react";
import { cartContext } from "../context/cartProvider";
import { deliveryContext } from "../context/deliveryProvider";

export function priceSummaryFunc(summary: string) {

    const { cartItem, setCartItem } = useContext(cartContext)
    const { deliveryInput, setDeliveryInput } = useContext(deliveryContext)

    let totalPriceForIncludes: number = 0;
    let deliveryPrice: number = 0;
    
    if (cartItem) {
        totalPriceForIncludes += cartItem!.price12mth
    }
    if (deliveryInput) {
        deliveryPrice += deliveryInput.price
    }

    cartItem?.including.forEach((x) => {

        if (x.qty > 1 && x.include.price && x.include?.name != "Integration") {
            let qty = x.qty - 1
            totalPriceForIncludes += qty * x.include.price

        } else {
            return undefined
        }
    })

    // use the argument to display what price you want  

     // tax a year
    if (summary === "moms.year") {
        return totalPriceForIncludes * 0.25 * 12
    }
    // tax a month
    if (summary === "moms.month") {
        return totalPriceForIncludes * 0.25 
    }
    // tax delivery
    if (summary === "moms.delivery") {
        return deliveryPrice * 0.25 
    }


    //price exlusive tax a year
    if (summary === "ex.year") {
        return totalPriceForIncludes * 12
    }
    //price exlusive tax a month
    if (summary === "ex.month") {
        return totalPriceForIncludes
    }
    //price inclusive tax a year
    if (summary === "inc.year") {
        return totalPriceForIncludes * 12 * 1.25 
    }
    //price inclusive tax a month
    if (summary === "inc.month") {
        return totalPriceForIncludes *  1.25
    }
    //price exlusive tax a month + delivery price one time fee
    if (summary === "ex.totalAmount") {
        return totalPriceForIncludes + deliveryPrice
    }
    //price inclusive tax a month + delivery price one time fee
    if (summary === "inc.totalAmount") {
        let month = totalPriceForIncludes *  1.25
        let deliveryCost = deliveryPrice * 1.25
        let sum = month + deliveryCost
        return sum
    }

}