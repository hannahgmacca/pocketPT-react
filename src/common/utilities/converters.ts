export function getEnumValues(enumObj: any)  {
    return Object.keys(enumObj)
        .map(key => key)
}