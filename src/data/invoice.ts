

export interface InputData {
    name: string,
    label: string,
    required: boolean,
    fullWidth: boolean,
    type: "number" | "text",
    // selectedError
    value: string,
    error: string,
    errorState: boolean
}

// inputData (fields) that will be rendered on the cart page.
export const inputData: InputData[] = [
    {
        name: "organization",
        label: "Företagsnamn",
        required: true,
        fullWidth: true,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "organisationsnummer",
        label: "Organisationsnummer",
        required: true,
        fullWidth: true,
        type: "number",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "fname",
        label: "Förnamn",
        required: true,
        fullWidth: false,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "lname",
        label: "Efternamn",
        required: true,
        fullWidth: false,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "street-address",
        label: "Faktureringsadress",
        required: true,
        fullWidth: true,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "address-line2",
        label: "Adressrad 2",
        required: false,
        fullWidth: true,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "postnummer",
        label: "Postnummer",
        required: true,
        fullWidth: false,
        type: "number",
        value: "",
        error: "",
        errorState: false,
    }, {
        name: "address-level1",
        label: "Postort",
        required: true,
        fullWidth: false,
        type: "text",
        value: "",
        error: "",
        errorState: false,
    },
]