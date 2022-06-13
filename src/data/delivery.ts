

export interface Delivery {
    id: number,
    title: string,
    numberOfDays: number,
    description: string,
    price: number,
}


export const delivery: Delivery[] = [
    {
        id: 1,
        title: "Fri integration",
        numberOfDays: 30,
        description: "Integration inom 30 dagar.",
        price: 0,
    }, {
        id: 2,
        title: "Standardintegration",
        numberOfDays: 10,
        description: "Integration inom 10 dagar.",
        price: 1000,
    }, {
        id: 3,
        title: "Expressintegration",
        numberOfDays: 1,
        description: "Integration inom 24 timmar.",
        price: 7000,
    }
]