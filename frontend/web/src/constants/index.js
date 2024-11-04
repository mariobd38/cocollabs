const keys = require("../config/dev");

export const OAUTH2_REDIRECT_URI = keys.redirectUri;

export const OAUTH2_CALLBACK_URI = keys.callbackUri;

export const GOOGLE_AUTH_URL_PREFIX = 'https://accounts.google.com/o';

// export const GOOGLE_AUTH_URL = `${GOOGLE_AUTH_URL_PREFIX}/oauth2/v2/auth?client_id=${import.meta.env.VITE_OAUTH2_CLIENT_REGISTRATION_GOOGLE_CLIENT_ID}&redirect_uri=${OAUTH2_REDIRECT_URI}&response_type=${import.meta.env.VITE_OAUTH2_CLIENT_REGISTRATION_GOOGLE_RESPONSE_TYPE}&access_type=offline&scope=${import.meta.env.VITE_OAUTH2_CLIENT_REGISTRATION_GOOGLE_RESPONSE_SCOPE}`