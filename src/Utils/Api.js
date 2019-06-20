import axios from "axios";

export default axios.create({
  // baseURL: 'http://localhost:5001/sme-survey-form/us-central1/api/form/',
  baseURL: 'http://us-central1-sme-survey-form.cloudfunctions.net/api/form/',
  responseType: 'json',
  // timeout: 1000,
  headers: {
    // 'Host': 'localhost:5001',
    // 'Host': 'us-central1-sme-survey-form.cloudfunctions.net',
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});
