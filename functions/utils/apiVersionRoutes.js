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

// REF: https://github.com/Prasanna-sr/express-routes-versioning
// REF: https://github.com/lirantal/express-version-route
// REF: https://docs.npmjs.com/misc/semver