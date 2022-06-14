import bild1 from '/src/assets/banners/happy_shop_owner.png'
import bild2 from '/src/assets/banners/happy_chef.png'
import bild3 from '/src/assets/banners/meeting.png'
import base from '/src/assets/icons/base.png'
import standard from '/src/assets/icons/standard.png'
import plus from '/src/assets/icons/plus.png'
import accountingicon from '/src/assets/icons/accounting.png'
import bank from '/src/assets/icons/bank.png'
import cafe from '/src/assets/icons/cafe.png'
import city from '/src/assets/icons/city.png'
import hotel from '/src/assets/icons/hotel.png'
import integrationicon from '/src/assets/icons/integration.png'
import receipt from '/src/assets/icons/receipt.png'
import invoiceicon from '/src/assets/icons/invoice.png'
import salaryicon from '/src/assets/icons/salary.png'
import success from '/src/assets/icons/success.png'
import teamwork from '/src/assets/icons/teamwork.png'
import skyscrapers from '/src/assets/icons/skyscrapers.png'


export interface Product {
    id: number,
    name: string,
    desc: string,
    thumbnail: string
    icon: string
    price3mth: number
    price12mth: number
    including: Include[]
}

export interface Include {
    id: number
    name: string
    desc: string
    price: number
}

const accounting : Include = {
    id: 1,
    name: "Bokföring",
    desc: "Med smarta och automatiserade lösningar gör vi bokföring både enklare och roligare. Kvitton och leverantörsfakturor hanteras helt digitalt och du får automatiskt förslag på hur de ska bokföras. Vi har kopplingar till samtliga Sveriges största banker, vilket gör att betalningar enkelt hanteras direkt från programmet.",
    price: 119,
}

export const integration : Include = {
    id: 2,
    name: "Integration",
    desc: "Med en Integrationslicens får du en hel värld av möjligheter eftersom du kan koppla ihop ditt Fortknox med över 400 olika tredjepartsprogram. Genom att integrera Fortknox med dina för- och eftersystem – exempelvis kassasystem, webbshopar eller arbetsordersystem – effektiviserar du din administration och undviker dubbelarbete.",
    price: 109,
}

const invoice : Include = {
    id: 3,
    name: "Fakturering",
    desc: "Med FortKnox skapar och skickar du obegränsat antal fakturor helt digitalt med ett par klick, oavsett om du är på språng eller vid en dator. Vi har stöd för flera smarta funktioner såsom automatisk återrapportering av inbetalningar från din bank, och rapportering av rot-, rut- och grönt avdrag till Skatteverket.",
    price: 119,
}

const salary : Include = {
    id: 4,
    name: "Lön",
    desc: "Alltid uppdaterat med aktuella skattetabeller, lagar och regler – så att du enkelt kan ta hand om lönerna själv. Automatisk överföring till Skatteverket underlättar arbetsgivardeklarationer på individnivå (AGI), och de anställda kan själva rapportera när- och frånvaro och få sina lönebesked i Fortknox App. Och bokföringen får du med automatik.",
    price: 109,
}

export const includings: Include[]  = [
    integration,
    accounting,
    invoice,
    salary,
]

export const products: Product[] = [
    {
        id: 1,
        name: "Fortknox Bas",
        desc: "Automatisk bokföring och helt digital hantering av kvitton och leverantörsfakturor. Integrera med över 400 olika för- och eftersystem för att undvika dubbelarbete",
        thumbnail: bild1,
        icon: base,
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
        thumbnail: bild2,
        icon: standard,
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
        thumbnail: bild3,
        icon: plus,
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









export interface CartProduct {
    id: number,
    name: string,
    desc: string,
    icon: string
    price3mth: number
    price12mth: number
    including: Includ[]
}

export interface Includ {
    include: Include,
    qty: number
}







interface Icon {
    src: string
    name: string
}


export const icons : Icon[] = [
    {src: base, name: "Base"},
    {src: standard, name: "Standard"},
    {src: plus, name: "Plus"},
    {src: skyscrapers, name: "Skyscrapers"},
    {src: hotel, name: "Hotel"},
    {src: city, name: "City"},
    {src: cafe, name: "Cafe"},
    {src: bank, name: "Bank"},
    {src: teamwork, name: "Teamwork"},
    {src: success, name: "Success"},
    {src: receipt, name: "Receipt"},
    {src: integrationicon, name: "Integration"},
    {src: accountingicon, name: "Accounting"},
    {src: invoiceicon, name: "Invoice"},
    {src: salaryicon, name: "Salary"},
]


