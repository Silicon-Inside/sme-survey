const functions = require('firebase-functions')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const server = require('./server')

const app = express()
const router = express.Router()


app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: true }))

router.get('/*', function (req, res) {
	res.send("I guess you were in the wrong place!")
})

router.post('/form/:spreadsheetId', server(deactivateErrors=true), function errorHandler(err) {
	console.log(err)
	console.error(err.stack)
	res.status(500).send({ error: 'Something failed!' })
})

app.use('/', router)
exports.api = functions.https.onRequest( app )
