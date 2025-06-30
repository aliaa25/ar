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
export interface IProjectImage {
  id?: string;
  image: string;
  createdAt?: string;
}
export interface IProjects {
  projectId: string
  userEmail: string,
  uploadedAt: string,
  imageBase64: string
}