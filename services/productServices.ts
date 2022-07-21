import data from '../database/database.json'
import { dataFile, Product } from '../models/productModel'
import http from 'http'
import { v4 as uuidv4, v4 } from 'uuid'
import fs from 'fs'


// const productsData: Product[] = JSON.parse(data.products)

export const findAll = () => {
    return new Promise((resolve, reject) => {
        try {
            
            if(data.products) {
                resolve(data.products)
            } else {
                resolve({message:'There are no products'})
            }

            
        } catch (err) {
            reject(err)
        }

    })
}

export const findById = (id: string) => {
    return new Promise((resolve, reject) => {
        try {
            const item = data.products.find((par) => { return par.id === id })
            if (item) {
                resolve(item)
            } else {
                resolve({message:`Product with id: ${id}, doesn't exist`})
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

            const {name, description, price} = JSON.parse(bodyData)

            if (name && description && price) {
                const product:Product = { id: uuidv4(), name, description, price }

                data.products.push(product)

                writeDataToFile('./database/database.json', data)

                resolve(product)
            } else {
                resolve({message:'Enter a valid product'})
            }
        } catch(err) {
            reject(err)
        }
        })

}

export const updateItem = (id: string) => {

}

export const deleteItem = (id: string) => {

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