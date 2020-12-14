export const combineElementClasses = (...classes: string[]): string => {
    let outputString = ''

    for(const className of classes){
        if(!className.length){
            continue
        }

        outputString += `${className} `
    }

    return outputString.trim()
}

export const spacesToKebabCase = (inputString: string): string => inputString.replace(/ /g, '-')