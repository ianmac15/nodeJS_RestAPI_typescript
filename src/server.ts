import http from 'http'
import { deleteReq, error404Response, getByIdReq, getReq, postReq, putReq } from '../controllers/productController'

const server = http.createServer((req, res) => {
    if (req.url === "/api/products") {
        if (req.method === 'GET') {
            getReq(req, res)
        } else if (req.method === 'POST') {
            postReq(req, res)
        }
    } else if (req.url?.match(/\/api\/products\/[0-9]+/)) {
        const id = req.url.split('/')[3]
        


        if (req.method === 'GET') {
            getByIdReq(req, res, id)
        } else if (req.method === 'PUT') {
            putReq(req, res, id)
        } else if (req.method === 'DELETE') {
            deleteReq(req, res, id)
        }
    } else {
        error404Response(res)
    }
})

const PORT = 5000

server.listen(PORT, () => { console.log(`Server running on PORT ${PORT}`) })
