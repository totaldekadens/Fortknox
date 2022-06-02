

export interface Delivery {
    title: string,
    numberOfDays: number,
    description: string,
    price: number,
}


export const delivery: Delivery[] = [
    {
        title: "Expressintegration",
        numberOfDays: 1,
        description: "Integration inom 24 timmar.",
        price: 7000,
    }, {
        title: "Standardintegration",
        numberOfDays: 10,
        description: "Integration inom 10 arbetsdagar.",
        price: 1000
    }, {
        title: "Fri integration",
        numberOfDays: 30,
        description: "Integration inom 30 arbetsdagar.",
        price: 0
    }
]