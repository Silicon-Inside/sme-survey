const functions = require('firebase-functions')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const server = require('./server')

const app = express()

app.use(cors({ origin: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.use(apiVersionRoutes = ( req, res ) => {
	console.log('this is the current version of the api: ', req.apiVersion)
})

router.get('/*', function (req, res) {
	res.send("I guess you are in the wrong place!")
})

router.post('/form/:spreadsheetId', server(deactivateErrors=true), function errorHandler(err) {
	console.log(err)
	console.error(err.stack)
	res.status(500).send({ error: 'Something failed!' })
})

app.use('/', router)
exports.api = functions.https.onRequest( app )
