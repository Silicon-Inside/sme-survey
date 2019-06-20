import axios from "axios";

export default axios.create({
  baseURL: 'http://us-central1-sme-survey-form.cloudfunctions.net/api/form/',
  responseType: 'json',
  // timeout: 1000,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});
