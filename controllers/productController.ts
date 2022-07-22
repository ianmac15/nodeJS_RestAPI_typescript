import http from 'http'
import { Product } from '../models/productModel'
import { findAll, findById, addItem, updateItem, deleteItem } from '../services/productServices'

// res.writeHead(200, { 'Content-Type': 'application/json' })
// res.write(JSON.stringify({ message: 'Successful response' }))

const writeResponse = (data: Product | string, statusCode: number, res: http.ServerResponse) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(data))
    res.end()
}

// const successfulRes = (data: Product | string, req: http.IncomingMessage, res: http.ServerResponse) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' })

//     if (req.method === 'POST') {
//         res.writeHead(201, { 'Content-Type': 'application/json' })
//     }
//     res.write(JSON.stringify(data))
//     res.end()
// }

// const failureRes = (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
//     res.writeHead(404, { 'Content-Type': 'application/json' })

//     if (req.method === 'POST') {
//         res.write(JSON.stringify({ message: `Enter a valid product` }))
//         res.end()
//     }

//     res.write(JSON.stringify({ message: `Product with id: ${id} not found` }))
//     res.end()

// }


// const checkDataStatus = (req: http.IncomingMessage, res: http.ServerResponse, data: any, id: string) => {
//     if (data) {
//         successfulRes(data, req, res)
//     } else {
//         failureRes(req, res, id)
//     }
// }

export const getReq = async (req: http.IncomingMessage, res: http.ServerResponse) => {

    try {
        const customResponse = await findAll()

        writeResponse(customResponse.product, customResponse.status, res)

        

    } catch (err) {
        console.log(err)
    }
}

export const getByIdReq = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {

    try {
        const customResponse = await findById(id)
        writeResponse(customResponse)
        checkDataStatus(req, res, data)

    } catch (err) {
        console.log(err)
    }
}

export const postReq = async (req: http.IncomingMessage, res: http.ServerResponse) => {

    try {
        const data = await addItem(req)

        checkDataStatus(req, res, data)

    } catch (err) {
        console.log(err)
    }
}

export const putReq = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {

    try {
        const data = await updateItem(req, id)

        checkDataStatus(req, res, data)

    } catch (err) {
        console.log(err)
    }
}

export const deleteReq = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {

    try {
        const data = await deleteItem(id)

        checkDataStatus(req, res, data)

    } catch (err) {
        console.log(err)
    }
}

export const error404Response = (res: http.ServerResponse) => {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ message: `Route not found` }))
    res.end()

}

