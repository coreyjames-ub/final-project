// IMPORT
// import accessToken, { accessToken } from './module.js';
import * as ApiKey from './apiKey.js';
let accessToken = ApiKey.getAccessToken();
let clientId = ApiKey.getClientId();
// import {clientSecret} from './module.mjs';

// API FUNCTIONS
async function stravaLoggedInUser() {
    let url = `https://www.strava.com/api/v3/athlete?access_token=${accessToken}`;
    let httpRes = await fetch(url);
    let data = await httpRes.json();
    console.log(data);
}

// stravaLoggedInUser();

async function stravaCode(){
    let url = `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read_all`;
}

async function stravaOAuth(){
    
    let httpRes = await fetch(url);
    let data = await httpRes.json();
    console.log(data);
}

// stravaOAuth();

function  logUrl() {
    let url = window.location.href;
    console.log(url);
}

logUrl();

