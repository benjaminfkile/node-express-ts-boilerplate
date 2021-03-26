const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const jsonParser = express.json()

const app: any = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.get('/API', (req: any, res: any) => {
    res.send('hello ts')
})

app.post(jsonParser, async (req: any, res: any, next: any) => {
    req.body
})


app.use(function errorHandler(error: any, req: any, res: any, next: any) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app