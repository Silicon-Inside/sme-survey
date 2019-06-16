require('dotenv').config()
const functions = require('firebase-functions')


const development = {
	app: {
		host: 'localhost',
		port: 5000
	},
	server: {
		host: 'localhost',
		port: 5001,
		project_name: process.env.PROJECT_NAME,
		server_location: process.env.SERVER_LOCATION,
		service: process.env.SERVICE
	}
}

const production = {
	app: {
		host: 'sme-survey-form.web.app',
		port: null
	},
	server: {
		host: 'us-central1-sme-survey-form.cloudfunctions.net/api',
		port: null,
		project_name: null,
		server_location: null,
		service: null
	}
}

const config = { development, production }

module.exports = config[process.env.NODE_ENV || functions.config().config.env];

