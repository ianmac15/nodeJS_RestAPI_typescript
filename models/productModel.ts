export interface Product {
    id: string
    name: string
    description: string
    price: number
}

export interface ProductNoId {
    name: string
    description: string
    price: number
}

export interface dataFile {
    products: Product[]
}

export type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

interface JSONObject {
    [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }

export interface ErrorMessage {
    message: string
    status: number
}

export interface CustomResponse {
    product: Product | Product[] | string
    status: number
}
