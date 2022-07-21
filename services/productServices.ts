import data from '../database/database.json'
import { dataFile, Product, ProductNoId } from '../models/productModel'
import http from 'http'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import { callbackify } from 'util'
import { resolve } from 'path'


// const productsData: Product[] = JSON.parse(data.products)

export const findAll = ():Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        resolve(data.products)
    })
}

export const findById = (id: string):Promise<Product> => {
    return new Promise((resolve, reject) => {

        const item = data.products.find((par) => { return par.id === id })

        exceptionHandle(item, resolve, reject)
    })
}

export const addItem = (req: http.IncomingMessage):Promise<Product | string> => {
    return new Promise(async (resolve, reject) => {
        
            const bodyData = await getRequestBodyData(req)

            const { name, description, price } = JSON.parse(bodyData)

            if (name && description && price) {
                const product: Product = { id: uuidv4(), name, description, price }

                data.products.push(product)

                writeDataToFile('./database/database.json', data)

                exceptionHandle(product, resolve, reject)
            } else {
                resolve('Enter a valid product')
            }
        
    })

}


export const updateItem = (req: http.IncomingMessage, id: string): Promise<Product | string> => {
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
                    exceptionHandle(newProduct, resolve, reject)
                } else {
                    resolve(`There is no product with id: ${id}`)
                }
                

            } else {
                resolve( 'Enter a valid product')
            }
        
    })
}

export const deleteItem = (id: string):Promise<string> => {
    return new Promise(async (resolve, reject)=>{
        const productDel = await findById(id)

        if (productDel) {
            data.products = data.products.filter((par)=>{
                return par.id !== id
            })
            writeDataToFile('./database/database.json', data)
            resolve(`Product with id: ${id} was deleted successfully`)
            // exceptionHandle(null, resolve, reject)
        } else {
            resolve(`There is no product with id: ${id}`)
        }
        
    })
}

const exceptionHandle = (value: any, resolve: (value: Product | PromiseLike<Product>) => void, reject: (reason?: any) => void) => {

    try {
        resolve(value)
    } catch (err) {
        reject(err)
    }

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