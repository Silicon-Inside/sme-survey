// const config = require('./config.js')

const functions = require('firebase-functions')
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

// const apiVersionRoutes = require('./utils/apiVersionRoutes')

// const server_version_1 = require('./server_version_1')
const server_version_2 = require('./server_version_2')

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Content-Type", "text/plain; charset=utf-8")
  // res.header("Host", "localhost:5001")
  // res.header("Host", "us-central1-sme-survey-form.cloudfunctions.net")
  next()
})

app.use(cors({ origin: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

// const requestedVersion
// router.use(function getRequestedApiVersion(req, res, next) {
//   requestedVersion = req.params.apiVersion
//   next()
// })

router.get('/*', function (req, res) {
	res.send("I guess you are in the wrong place!")
})

router.post('/form/:apiVersion', 
	server_version_2(deactivateErrors=true), 
	function errorHandler(err) {
		console.log(err)
		console.error(err.stack)
		res.status(500).send({ error: 'Something failed!' })
	}
)

// router.post('/form/:apiVersion/:spreadsheetId', apiVersionRoutes({
// 	requestedVersion: requestedVersion,
// 	availableApiVersions: {
// 		'1.0.0': [ server_version_1, deactivateErrors=true ],
// 		'2.0.0': [ server_version_2, deactivateErrors=true ]
// 	}
// }), function errorHandler(err) {
// 	console.error(err.stack)
// 	res.status(500).send({ error: 'Something failed!' })
// })

app.use('/', router)
exports.api = functions.https.onRequest( app )
