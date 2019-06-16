const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  // 'https://www.googleapis.com/auth/drive.metadata.readonly'
];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = '../key/token.json';
const CREDENTIALS_PATH = '../key/credentials.json';

// Load client secrets from a local file.
const loadKeys = () => {
  return ;
}

const authorize = (content) => {
  return ;
}

exports.googleAuth = () => {
  const content = loadKeys();
  const auth = authorize(content);
  return auth;
}

// server.js
// const googleAuth = require('./utils/auth.js');
// console.log(googleAuth());