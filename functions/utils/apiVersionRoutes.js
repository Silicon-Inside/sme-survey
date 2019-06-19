const semver = require('semver')

module.exports = function apiVersionRoutes( args ) {
  return function ( params ) {
  	const requestedVersion = args.requestedVersion
  	/* TODO: sember evaluation */
	  const responseVersion = args.availableApiVersions[requestedVersion]

	  const resFunction = responseVersion[0]
	  const functionParams = responseVersion[1]

		resFunction.call(this, functionParams)
  }
}