

export interface PaymentOptions {
    id: number,
    name: string,
    description: string,
    input?: InputField[]
}

interface InputField {
    name: string,
    type: string,
}


export const paymentOptions: PaymentOptions[] = [
    {
        id: 1,
        name: "Swish",
        description: "Betala snabbt och enkelt med Swish.",
        input: [
            {
                name: "Mobilnummer",
                type: "number"
            }
        ]
    }, {
        id: 2,
        name: "Kortbetalning",
        description: "Betala med valfritt kort.",
        input: [
            {
                name: "Kortnummer",
                type: "number"
            },
            {
                name: "Datum",
                type: "number"
            },
            {
                name: "CVC",
                type: "number"
            },
            {
                name: "Kortinnehavarens namn",
                type: "text"
            },
        ]
    },
]