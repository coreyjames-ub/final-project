// IMPORT
// import accessToken, { accessToken } from './module.js';
import * as ApiKey from './apiKey.js';
let accessToken = ApiKey.getAccessToken();
// import {clientId} from './module.mjs';
// import {clientSecret} from './module.mjs';

// API FUNCTIONS
async function stravaLoggedInUser() {
    let url = `https://www.strava.com/api/v3/athlete?access_token=${accessToken}`;
    let httpRes = await fetch(url);
    let data = await httpRes.json();
    console.log(data);
}

stravaLoggedInUser();

async function stravaReadAll(){
    let url = 'https://www.strava.com/oauth/authorize?client_id=83079&client_secret=1e2f9f71f5c0af93c7e542f3beb377f58e618dcf'
}