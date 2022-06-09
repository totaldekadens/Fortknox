

export interface PaymentOptions {
    id: number,
    name: string,
    description: string,
    input: InputField[]
}

interface InputField {
    name: string,
    type: string,
    value: string | number
    error: string
    errorState: boolean
}


export const paymentOptions: PaymentOptions[] = [
    {
        id: 1,
        name: "Swish",
        description: "Betala snabbt och enkelt med Swish.",
        input: [
            {
                name: "Mobilnummer",
                type: "number",
                value: 0,
                error: "",
                errorState: false,
            }
        ]
    }, {
        id: 2,
        name: "Kortbetalning",
        description: "Betala med valfritt kort.",
        input: [
            {
                name: "Kortnummer",
                type: "number",
                value: 0,
                error: "",
                errorState: false,
            },
            {
                name: "Utgångsdatum",
                type: "number",
                value: 0,
                error: "",
                errorState: false,
            },
            {
                name: "CVC",
                type: "number",
                value: 0,
                error: "",
                errorState: false,
            },
            {
                name: "Kortinnehavarens namn",
                type: "text",
                value: "",
                error: "",
                errorState: false,
            },
        ]
    },
]