export interface IProduct {
    "imageUrl": string,
    "name": string,
    "description": string,
    "type": string,
    "price": number,
    "arFileUrl": string,
    "Width": number,
    "Length": number,
    "Height": number,
    "createdAt": string,
    "__v": number
}
export interface IArFile {
    "arFileUrl": string
}