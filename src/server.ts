
// import * as http from 'http'
// // const http = require('http')
// // import http = require('http')

// export function serverComponent() {
//     const server = http.createServer((req, res) => {
//         if (req.url === "api/products" && req.method === 'GET') {
//             res.writeHead(200, { 'Content-Type': 'application/json' })
//             res.write(JSON.stringify({ message: 'Successful response' }))
//         }
//     })

//     const PORT = 5000

//     server.listen(PORT, () => { console.log(`Server running on PORT ${PORT}`) })
// }

import express from 'express'

const app:express.Application = express()

app.get('/',(req, res)=>{
    res.send('Hello')
})

app.listen(5000, ()=> {console.log('Server is running')})