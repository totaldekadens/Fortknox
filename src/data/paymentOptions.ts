

export interface PaymentOptions {
    id: number,
    name: string,
    description: string,
    input?: InputField[]
}

interface InputField {
    name: string,
    label: string,
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
                name: "tel",
                label: "Mobilnummer",
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
                name: "cc-number",
                label: "Kortnummer",
                type: "number",
                value: 0,
                error: "",
                errorState: false,
            },
            {
                name: "cc-exp",
                label: "Utgångsdatum",
                type: "number",
                value: 0,
                error: "",
                errorState: false,
            },
            {
                name: "cc-csc",
                label: "CVC",
                type: "number",
                value: 0,
                error: "",
                errorState: false,
            },
            {
                name: "cc-name",
                label: "Kortinnehavarens namn",
                type: "text",
                value: "",
                error: "",
                errorState: false,
            },
        ]
    }, {
        id: 3,
        name: "Faktura",
        description: "Betala mot faktura, 30 dagar.",
    },
]