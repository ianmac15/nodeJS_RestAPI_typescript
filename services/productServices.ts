import data from '../database/database.json'
import { CustomResponse, dataFile, ErrorMessage, Product, ProductNoId } from '../models/productModel'
import http from 'http'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import { callbackify } from 'util'
import { resolve } from 'path'


// const productsData: Product[] = JSON.parse(data.products)

export const findAll = ():Promise<CustomResponse> => {
    return new Promise((resolve, reject) => {
        if (data.products) {
            customResolve(createResponse(data.products, 200), resolve, reject)
        } else {
            customResolve(createResponse('There are no products in the database.', 404), resolve, reject)
        }
        
    })
}


const findById = (id: string):Promise<Product> => {
    return new Promise((resolve, reject) => {

        const item = data.products.find((par) => { return par.id === id })

        if (item) {
            resolve(item)
        } 

        
    })
}

export const getById = (id: string):Promise<CustomResponse> => {
    return new Promise(async (resolve, reject) => {

        const item = await findById(id)

        if (item) {
            customResolve(createResponse(item, 200), resolve, reject)
        } else {
            customResolve(createResponse('There are no products in the database.', 404), resolve, reject)
        }

        
    })
}

export const addItem = (req: http.IncomingMessage):Promise<CustomResponse> => {
    return new Promise(async (resolve, reject) => {
        
            const bodyData = await getRequestBodyData(req)

            const { name, description, price } = JSON.parse(bodyData)

            if (name && description && price) {
                const product: Product = { id: uuidv4(), name, description, price }

                data.products.push(product)

                writeDataToFile('./database/database.json', data)

                customResolve(createResponse(product, 201), resolve, reject)
            } else {
                customResolve(createResponse('Enter a valid product', 400), resolve, reject)
            }
        
    })

}


export const updateItem = (req: http.IncomingMessage, id: string): Promise<CustomResponse> => {
    return new Promise(async (resolve, reject) => {
        
            const bodyData = await getRequestBodyData(req)

            const inputProduct:ProductNoId = JSON.parse(bodyData)

            if (inputProduct) {
                const updProduct:Product = await findById(id)

                if (updProduct) {
                    const newProduct: Product = {
                        id: id,
                        name: inputProduct.name || updProduct.name,
                        description: inputProduct.description || updProduct.description,
                        price: inputProduct.price || updProduct.price
                    }

                    // const index = data.products.findIndex((par)=>{
                    //     return par.id===id
                    // })

                    // data.products[index] = newProduct

                    data.products = data.products.map((par)=>{
                        if (par.id===id) {
                            return newProduct
                        }
                        return par
                    })

                    writeDataToFile('./database/database.json', data)
                    customResolve(createResponse(newProduct, 200), resolve, reject)
                } else {
                    customResolve(createResponse(`There is no product with id: ${id}`, 404), resolve, reject)
                }
                

            } else {
                customResolve(createResponse('Enter a valid product', 400), resolve, reject)
            }
        
    })
}

export const deleteItem = (id: string):Promise<CustomResponse> => {
    return new Promise(async (resolve, reject)=>{
        const productDel = await findById(id)

        if (productDel) {
            data.products = data.products.filter((par)=>{
                return par.id !== id
            })
            writeDataToFile('./database/database.json', data)
            
            customResolve(createResponse(`Product with id: ${id} was deleted successfully`, 204), resolve, reject)
            // customResolve(null, resolve, reject)
        } else {
            customResolve(createResponse(`There is no product with id: ${id}`, 404), resolve, reject)
        }
        
    })
}

const customResolve = (value: any, resolve: (value: CustomResponse | PromiseLike<CustomResponse>) => void, reject: (reason?: any) => void) => {

    try {
        resolve(value)
    } catch (err) {
        reject(err)
    }

}

const createResponse = (responseData: Product[] | Product | string, statusCode: number) => {
    const customResponse: CustomResponse = {
        product: responseData,
        status: statusCode
    }
    return customResponse
}

const getRequestBodyData = (req: http.IncomingMessage): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            req.on('data', (chunk: string) => {
                body += chunk.toString()
            })

            req.on('end', (chunk: string) => {
                // body = JSON.parse(chunk)
                resolve(body)
            })
        } catch (err) {
            reject(err)
        }
    })
}

const writeDataToFile = (filePath: fs.PathOrFileDescriptor, file: any) => {
    fs.writeFileSync(filePath, JSON.stringify(file), 'utf-8')
}