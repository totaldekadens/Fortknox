# Fortknox
Inlämningsuppgift 2


# How to install repo

npm i
npx vite || npm run dev

# Responsiveness

Small (smaller than 640px)
Medium (641px to 1007px)
Large (1008px and larger)

# Idea 
1. cartButton.tsx -> CartButton:
Add Links to cartpage 

# File structure
components
    pages
        product.tsx
        front.tsx
        checkOut.tsx
    interaction
        buttons.tsx
        input.tsx
    common
        footer.tsx
        navbar.tsx
        lines.tsx
    payment

    product
        poductList.tsx

        productCard.tsx
        productBanner.tsx
        productDesc

    template
        container.tsx
        banner.tsx
        hero.tsx



app.tsx
contentContainer.tsx
layout.tsx

## Krav för godkänt:
1.  Git & GitHub har använts ✅
2.  Projektmappen innehåller en README.md fil ✅
3.  Uppgiften lämnas in innan deadline! ✅❌
4.  4.Ett designsystem används ✅
5.  5.React Router skall användas som navigation. Exempelvis så skall produkten som visas på produktsidan ska baseras på en parameter i url’en. ✅
6.  6.React context skall användas för hantering av kundvagnen. ✅
7.  7.Samtliga fält ska ha valideringsregler (tips, se Material UI:s dokumentation) ✅❌
8.  8.Sidan ska vara fullt responsiv ✅❌
9.  9.Mockade produkter ska ligga i en egen fil och vara typade med ett TS interface ✅

## Krav för väl godkänt:
1.  Alla punkter för godkänt är uppfyllda ✅❌
2.  Det finns en admin-sida där man kan ändra, lägga till eller ta bort produkter på sidan ✅
3.  Samtliga produkter skall vara sparade i localstorage (om localstorage är tom då sidan läses in behöver samtliga fördefinierade produkter sparas där) ✅
