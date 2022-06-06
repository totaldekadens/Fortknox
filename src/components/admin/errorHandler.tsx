
const errorLoop = (errorList: any[]) =>  {

    const copy =  errorList.map((item) => {

        const itemCopy = item

        // Checks for empty input value.
        if(itemCopy.name == "" || itemCopy.name == " ") {

            itemCopy.error = true;
            return itemCopy;

        } else if(typeof(itemCopy.name) == "number" && itemCopy.name < 1 ) {
            itemCopy.error = true;
            return itemCopy;
        }  
        else {
            item.error = false;
            return itemCopy;
        }
    })

    return copy
}

export default errorLoop