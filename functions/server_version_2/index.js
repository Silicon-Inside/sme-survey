const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  // 'https://www.googleapis.com/auth/drive.metadata.readonly'
];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'key/token.json';
const CREDENTIALS_PATH = 'key/credentials.json';



/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

function authorize(credentials, req) {
  const {
    client_secret, 
    client_id, 
    redirect_uris
  } = credentials;

  const oAuth2Client = new google.auth.OAuth2(
    client_id, 
    client_secret, 
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));


    insertValues(oAuth2Client, req);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });

      return oAuth2Client;
    });
  });
}

const urlTestSheet1 = '1M-30lRrwXCXiaGnCrk85vwaGkfs0YU1r35DIwCJy4MA';
const urlTestSheet2 = '1pbEG_HGrhKsh8seYF4-7h-5Wiq6PBVvKWqZjuitQmJw'; // default


function insertValues(auth, req) {
  const sheets = google.sheets({ version: 'v4', auth });
  
  var iname = 'Test Sheet'
  if (req.body.params.info.iname === urlTestSheet2)
    iname = 'Test Sheet 2'
  else if (req.body.params.info.iname === urlTestSheet1)
    iname = 'Test Sheet 1'

	sheets.spreadsheets.values.append({
	  spreadsheetId: req.body.params.info.iname,
	  range: "Info!C3",
	  valueInputOption: 'USER_ENTERED',
	  insertDataOption: 'INSERT_ROWS',
	  resource: {
	    values: [
        [
          iname,
          req.body.params.info.fname,
          req.body.params.info.email,
          req.body.params.info.cnumber,
          req.body.params.info.xp,
          req.body.params.info.gender,
          req.body.params.time,
        ]
      ],
	    majorDimension: 'ROWS'
	  }
	}, (err, result) => {
	  if (err) console.log(err);
	  // else console.log(`${result.data.updates.updatedCells} cells appended in Info.`);
	});

	var i;
	for ( i = 0; i < 9; ++i ) {
	  var sheetName = "Sheet" + String.fromCharCode( i + 65 );
	  sheets.spreadsheets.values.append({
	    spreadsheetId: req.body.params.info.iname,
	    range: (sheetName + "!C4"),
	    valueInputOption: 'USER_ENTERED',
	    insertDataOption: 'INSERT_ROWS',
	    resource: {
	      values: [ req.body.params.values[sheetName] ],
	      majorDimension: 'ROWS'
	    }
	  }, (err, result) => {
	    if (err) console.log(err);
	    // else console.log(`${result.data.updates.updatedCells} cells appended in Sheet${String.fromCharCode( --i + 65 )}.`);
	  });
	}

}

module.exports = function server(deactivateErrors=true) {
  return function (req, res, next) {
		// Load client secrets from a local file.
		fs.readFile(CREDENTIALS_PATH, (err, content) => {
		  if (err) return console.log('Error loading client secret file:', err);
      else res.status(200).send('Sheet Updated ;)!')
		  // Authorize a client with credentials, then call the Google Sheets API.
		  authorize(JSON.parse(content), req);
		});

		if ( !deactivateErrors ) next( err )
  }
}