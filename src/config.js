let config = {};

export const API_URL =
  config.API_ENDPOINT ||
  process.env.API_ENDPOINT ||
  "https://dev.ehealth.world";

export const AUTH_URL =
  config.API_ENDPOINT ||
  process.env.AUTH_ENDPOINT ||
  "https://dev.ehealth.world";

export const CLIENT_ID =
  config.CLIENT_ID ||
  process.env.CLIENT_ID ||
  "e2e1d2c8-9bac-43c6-adef-83239940b30a";

export const AUTH_COOKIE_NAME =
  config.AUTH_COOKIE_NAME || process.env.AUTH_COOKIE_NAME || "token";
