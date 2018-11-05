const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const routes = require('./routes/elephants')
app.use('/elephants', routes)

app.use((err, req, res, next) => {
    res.status(err.status).json(err)
})

app.use((req, res, next) => {
    res.status(404).json({ error: { message: 'Not found' } })
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)