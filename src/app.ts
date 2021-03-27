const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const jsonParser = express.json()
const app = express()
const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';
const router = require('./router/router')



app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

//custom routers
app.use('/api/', router)

app.use(function errorHandler(error: any, res: any) {
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