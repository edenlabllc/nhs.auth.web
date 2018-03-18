
let config = {};

if (__CLIENT__ && window && window.__CONFIG__) {
  try {
    config = JSON.parse(unescape(window.__CONFIG__));
  } catch (e) {} // eslint-disable-line
}

export const PORT = config.PORT || process.env.PORT || 8080;
export const HOSTNAME = typeof window !== 'undefined' ? window.location.origin : (config.HOSTNAME || 'http://localhost:8080');
export const API_ENDPOINT = config.API_ENDPOINT || process.env.API_ENDPOINT || 'https://dev.ehealth.world';
export const AUTH_ENDPOINT = config.API_ENDPOINT || process.env.AUTH_ENDPOINT || 'https://dev.ehealth.world';

export const SITEMAP_HOSTNAME = config.SITEMAP_HOSTNAME || process.env.SITEMAP_HOSTNAME || 'http://localhost:8080'; // used in sitemap
export const LANG_COOKIE_NAME = 'lang';

export const API_PROXY_PATH = '/api';
export const AUTH_PROXY_PATH = '/api.auth';

export const CLIENT_ID = config.CLIENT_ID || process.env.CLIENT_ID || 'e2e1d2c8-9bac-43c6-adef-83239940b30a';

export const AUTH_COOKIE_NAME = config.AUTH_COOKIE_NAME || process.env.AUTH_COOKIE_NAME || 'token';

// for internal app usage. for example for XHR requests or server side rendering
export const API_URL = API_ENDPOINT;
export const AUTH_URL = AUTH_ENDPOINT;
