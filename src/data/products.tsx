import bild1 from '/src/assets/banners/happy_shop_owner.png'
import bild2 from '/src/assets/banners/happy_chef.png'
import bild3 from '/src/assets/banners/meeting.png'

// Package
export interface Product {
    id: number,
    name: string,
    desc: string,
    image: string
    price3mth: number
    price12mth: number
    including: [
        Integration,
        Accounting,
        Invoice?,
        Salary?
    ] 
}


// Includes
interface Accounting {
    id: number
    name: string
    desc: string
    price: number
    verifikationer:  {name: string, desc: string}
    leverantorsfakturor: {name: string, desc: string}
    kvitton: {name: string, desc: string}
    leverantorsregister: {name: string, bool: boolean}
    rapporter: {name: string, bool: boolean}
    ai_bokforing: {name: string, bool: boolean}
    automatisk_momshantering: {name: string, bool: boolean}
    tolkning_av_dokument: {name: string, desc: string}
    bokslut: {name: string, desc: string}
}

interface Integration {
    id: number
    name: string
    desc: string
    price?: number
    integrera_med_externa_system: {name: string, bool: boolean}
    fri_support: {name: string, desc: string}
    molnbaserat: {name: string, bool: boolean}
    Fortknox_app: {name: string, bool: boolean}
}

interface Invoice {
    id: number
    name: string
    desc: string
    price: number
    kundfakturor: {name: string, bool: boolean}
    inbetalning: {name: string, bool: boolean}
    paminnelsehantering: {name: string, bool: boolean}
    fakturaservice: {name: string, desc: string | undefined}
    artikelregister: {name: string, bool: boolean}
    kundregister: {name: string, bool: boolean}
    rapporter: {name: string, bool: boolean}
    prislistor: {name: string, bool: boolean}
    rot_rut_gront_avdrag: {name: string, bool: boolean}

}


interface Salary {
    id: number
    name: string
    desc: string
    price: number
    personalregister: {name: string, bool: boolean}
    digitala_lonebesked: {name: string, desc: string | undefined}
    kalendarium: {name: string, bool: boolean}
    nar_och_franvaroregistrering: {name: string, bool: boolean}
    semesterhantering: {name: string, bool: boolean}
    statistikrapportering: {name: string, bool: boolean}
    automatisk_AGI_deklaration	: {name: string, bool: boolean}
}



const accounting : Accounting = {
    id: 1,
    name: "Bokföring",
    desc: "Med smarta och automatiserade lösningar gör vi bokföring både enklare och roligare. Kvitton och leverantörsfakturor hanteras helt digitalt och du får automatiskt förslag på hur de ska bokföras. Vi har kopplingar till samtliga Sveriges största banker, vilket gör att betalningar enkelt hanteras direkt från programmet.",
    price: 119,

    verifikationer:  {
        name: "Verifikationer", 
        desc: "Obegränsat"},

    leverantorsfakturor: {
        name: "Leverantörsfakturor", 
        desc: "Obegränsat"},

    kvitton:{ 
        name: "Kvitton", 
        desc: "Obegränsat"},

    leverantorsregister: {
        name: "Leverantörsregister", 
        bool: true},

    rapporter: {
        name: "Rapporter", 
        bool: true},

    ai_bokforing: {
        name: "AI bokföring", 
        bool: true},

    automatisk_momshantering: {
        name: "Leverantörsregister", 
        bool: true},

    tolkning_av_dokument: { 
        name: "Tolkning av dokument ", 
        desc: "från 4,90 kr/st"},

    bokslut: {
        name: "Bokslut", 
        desc: "Via integration"}
}

const integration : Integration = {
    id: 2,
    name: "Integration",
    desc: "Med en Integrationslicens får du en hel värld av möjligheter eftersom du kan koppla ihop ditt Fortknox med över 400 olika tredjepartsprogram. Genom att integrera Fortknox med dina för- och eftersystem – exempelvis kassasystem, webbshopar eller arbetsordersystem – effektiviserar du din administration och undviker dubbelarbete.",
    price: 109,
    integrera_med_externa_system : { 
        name: "Integrera med externa system", 
        bool: true},

    fri_support: {
        name: "Fri support", 
        desc: "Obegränsat"},

    molnbaserat: { 
        name: "Molnbaserat", 
        bool: true},

    Fortknox_app: { 
        name: "Fortknox App", 
        bool: true},
}

const invoice : Invoice = {
    id: 3,
    name: "Fakturering",
    desc: "Med FortKnox skapar och skickar du obegränsat antal fakturor helt digitalt med ett par klick, oavsett om du är på språng eller vid en dator. Vi har stöd för flera smarta funktioner såsom automatisk återrapportering av inbetalningar från din bank, och rapportering av rot-, rut- och grönt avdrag till Skatteverket.",
    price: 119,

    kundfakturor: { 
        name: "Kundfakturor", 
        bool: true},

    inbetalning: { 
        name: "Inbetalning", 
        bool: true},

    paminnelsehantering: { 
        name: "Påminnelsehantering", 
        bool: true},

    fakturaservice: {
        name: "Fakturaservice", 
        desc: "från 4,90 kr/st"},

    artikelregister: { 
        name: "Artikelregister", 
        bool: true},

    kundregister: { 
        name: "Kundregister", 
        bool: true},

    rapporter: { 
        name: "Rapporter", 
        bool: true},

    prislistor: { 
        name: "Prislistor", 
        bool: true},

    rot_rut_gront_avdrag: { 
        name: "ROT/RUT/ Grönt avdrag", 
        bool: true},
}

const salary : Salary = {
    id: 4,
    name: "Lön",
    desc: "Alltid uppdaterat med aktuella skattetabeller, lagar och regler – så att du enkelt kan ta hand om lönerna själv. Automatisk överföring till Skatteverket underlättar arbetsgivardeklarationer på individnivå (AGI), och de anställda kan själva rapportera när- och frånvaro och få sina lönebesked i Fortknox App. Och bokföringen får du med automatik.",
    price: 109,

    personalregister: { 
        name: "Personalregister", 
        bool: true},

    digitala_lonebesked: { 
        name: "Digitala lönebesked", 
        desc: "12 kr/st"},

    kalendarium: { 
        name: "Kalendarium", 
        bool: true},

    nar_och_franvaroregistrering: { 
        name: "När- och frånvaroregistrering", 
        bool: true},

    semesterhantering: { 
        name: "Semesterhantering", 
        bool: true},

    statistikrapportering: { 
        name: "Statistikrapportering", 
        bool: true},

    automatisk_AGI_deklaration	: { 
        name: "Automatisk_AGI_deklaration", 
        bool: true},
}



export const products: Product[] = [
    {
        id: 1,
        name: "Fortknox Bas",
        desc: "Automatisk bokföring och helt digital hantering av kvitton och leverantörsfakturor. Integrera med över 400 olika för- och eftersystem för att undvika dubbelarbete",
        image: bild1,
        price3mth: 159,
        price12mth: 139,
        including: [
            integration,
            accounting 
        ]
    }, {
        id: 2,
        name: "Fortknox Standard",
        desc: "För dig som vill ta betalt av dina kunder och få bokföringen med automatik. Skicka fakturor och påminnelser helt digitalt på webben eller i mobilen med Fortknox App.",
        image: bild2,
        price3mth: 229,
        price12mth: 199,
        including: [
            integration,
            accounting, 
            invoice
        ]
    }, {
        id: 3,
        name: "Fortknox Plus",
        desc: "När du även vill hantera löner i företaget. Alltid uppdaterat med aktuella skattetabeller, lagar och regler vilket gör både lönearbetet och rapporteringen enkel.",
        image: bild3,
        price3mth: 329,
        price12mth: 299,
        including: [
            integration,
            accounting, 
            invoice,
            salary
        ]
    }
]