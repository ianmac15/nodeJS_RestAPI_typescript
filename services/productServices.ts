import data from '../database/database.json'
import { Product } from '../models/productModel'

// const productsData: Product[] = JSON.parse(data.products)

export const findAll = ():Promise<Product> => {
    return new Promise((resolve, reject)=>{
        resolve(data.products)
    })
}

export const findById = () => {
    
}

export const addItem = () => {
    
}

export const updateItem = () => {
    
}

export const deleteItem = () => {
    
}