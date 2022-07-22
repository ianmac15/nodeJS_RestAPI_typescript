import http from 'http'
import { CustomResponse, Product } from '../models/productModel'
import { findAll, addItem, updateItem, deleteItem, getById } from '../services/productServices'

// res.writeHead(200, { 'Content-Type': 'application/json' })
// res.write(JSON.stringify({ message: 'Successful response' }))

const writeResponse = (data: Product | string | Product[], statusCode: number, res: http.ServerResponse) => {
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
    const customResponse = await findAll()
    handleResponse(customResponse, res)
}

export const getByIdReq = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
    const customResponse = await getById(id)
    handleResponse(customResponse, res)
}

export const postReq = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const customResponse = await addItem(req)
    handleResponse(customResponse, res)
}

export const putReq = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
    const customResponse = await updateItem(req, id)
    handleResponse(customResponse, res)
}

export const deleteReq = async (req: http.IncomingMessage, res: http.ServerResponse, id: string) => {
    const customResponse = await deleteItem(id)
    handleResponse(customResponse, res)
}

export const error404Response = (res: http.ServerResponse) => {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify({ message: `Route not found` }))
    res.end()

}

const handleResponse = (customResponse: CustomResponse, res: http.ServerResponse) => {
    try {
        writeResponse(customResponse.product, customResponse.status, res)
    } catch (err) {
        console.log(err)
    }
}

