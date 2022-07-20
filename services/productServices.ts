import * as data from '../database/database.json'
import { Product } from '../models/productModel'
import http from 'http'
import { v4 as uuidv4, v4 } from 'uuid'
import fs from 'fs'
import { resolve } from 'path'


// const productsData: Product[] = JSON.parse(data.products)

export const findAll = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        try {
            resolve(data.products)
        } catch (err) {
            reject(err)
        }

    })
}

export const findById = (id: number): Promise<Product> => {
    return new Promise((resolve, reject) => {
        try {
            const item = data.products.find((par) => { return par.id === id })
            if (item) {
                resolve(item)
            } else {
                reject(console.log(`Product with id: ${id}, doesn't exist`))
            }
        }
        catch (err) {
            reject(err)
        }

    })
}

export const addItem = (req: http.IncomingMessage) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bodyData = await getRequestBodyData(req)

            // const {name, description, price} = JSON.parse(bodyData)

            const productNoID = JSON.parse(bodyData)

            if (productNoID) {
                const product: Product = { id: uuidv4(), ...productNoID }

                data.products.push(product)

                writeDataToFile('./data/database.json', data)

                resolve(product)
            } else {
                reject('Enter a valid product')
            }
        } catch(err) {
            reject(err)
        }
        })

}

export const updateItem = () => {

}

export const deleteItem = () => {

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

const writeDataToFile = (filePath: fs.PathOrFileDescriptor, file: string | NodeJS.ArrayBufferView) => {
    fs.writeFileSync(filePath, JSON.stringify(file), 'utf-8')
}