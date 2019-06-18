const config = require('./config.js')

const functions = require('firebase-functions')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const apiVersionRoutes = require('./apiVersionRoutes')

const server_version_1 = require('./server_version_1')
const server_version_2 = require('./server_version_2')

const app = express()

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

app.use(cors({ origin: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/*', function (req, res) {
	res.send("I guess you are in the wrong place!")
})

// router.post('/form/:apiVersion/:spreadsheetId', 
// 	server_version_1(deactivateErrors=true), 
// 	function errorHandler(err) {
// 		console.log(err)
// 		console.error(err.stack)
// 		res.status(500).send({ error: 'Something failed!' })
// 	}
// )

router.post('/form/:apiVersion/:spreadsheetId', apiVersionRoutes({
	'1.0.0': server_version_1( deactivateErrors=true ),
	'2.0.0': server_version_2( deactivateErrors=true )
}), function errorHandler(err) {
	console.error(err.stack)
	res.status(500).send({ error: 'Something failed!' })
})

app.use('/', router)
exports.api = functions.https.onRequest( app )


