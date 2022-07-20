import http from 'http'
import { findAll, findById, addItem, updateItem, deleteItem } from '../services/productServices'

// res.writeHead(200, { 'Content-Type': 'application/json' })
// res.write(JSON.stringify({ message: 'Successful response' }))

const successfulRes = (data: any, req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })

    if (req.method === 'POST') {
        res.writeHead(201, { 'Content-Type': 'application/json' })
    }
    res.write(JSON.stringify(data))
    res.end()
}

const failureRes = (res: http.ServerResponse, item: string) => {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.write({message: `${item} not found`})
    res.end()
}


const checkDataStatus = (req: http.IncomingMessage, res: http.ServerResponse, data: any) => {
    if (data) {
        successfulRes(data, req, res)
    } else {
        failureRes(res, 'Product')
    }
}

export const getReq = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    
    try {
        const data = await findAll()

        checkDataStatus(req, res, data)

    } catch(err) {
        console.log(err)
    }
}

export const getByIdReq = async (req: http.IncomingMessage, res: http.ServerResponse, id: number) => {
    
    try {
        const data = await findById(id)

        checkDataStatus(req, res, data)

    } catch(err) {
        console.log(err)
    }
}

export const postReq = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    
    try {
        const data = await addItem(req)

        checkDataStatus(req, res, data)

    } catch(err) {
        console.log(err)
    }
}

export const putReq = async (req: http.IncomingMessage, res: http.ServerResponse, id: number) => {
    
    try {
        const data = await updateItem(id)

        checkDataStatus(req, res, data)

    } catch(err) {
        console.log(err)
    }
}

export const deleteReq = async (req: http.IncomingMessage, res: http.ServerResponse, id: number) => {
    
    try {
        const data = await deleteItem(id)

        checkDataStatus(req, res, data)

    } catch(err) {
        console.log(err)
    }
}

export const error404Response = (res: http.ServerResponse) => {
    failureRes(res, "Route")
}

