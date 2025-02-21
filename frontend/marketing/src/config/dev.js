const devConfig = {
    redirectUri: `${import.meta.env.VITE_CLIENT_BASE_URI}/${import.meta.env.VITE_OAUTH2_CLIENT_REGISTRATION_GOOGLE_REDIRECT_URI}`,
    callbackUri: `${import.meta.env.VITE_SERVER_BASE_URI}/${import.meta.env.VITE_OAUTH2_SERVER_REGISTRATION_GOOGLE_CALLBACK_URI}`,
};

export default devConfig;