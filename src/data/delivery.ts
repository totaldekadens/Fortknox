

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
        title: "Fri leverans",
        numberOfDays: 30,
        description: "Leverans inom 30 dagar.",
        price: 0,
    }, {
        id: 2,
        title: "Standardleverans",
        numberOfDays: 10,
        description: "Leverans inom 10 dagar.",
        price: 1000,
    }, {
        id: 3,
        title: "Expressleverans",
        numberOfDays: 1,
        description: "Leverans inom 24 timmar.",
        price: 7000,
    }
]