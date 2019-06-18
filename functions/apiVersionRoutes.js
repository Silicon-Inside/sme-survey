const semver = require('semver')

module.exports = function apiVersionRoutes() {
	return function (args) {
	  return function (req, res, next) {
	  	console.log(req.params.apiVersion)
			args['1.0.0'].call(this, req, res, next)
			return
	  }
	}
}