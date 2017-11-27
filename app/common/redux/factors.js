// import { handleAction } from 'redux-actions';
import { AUTH_URL } from 'config';
import { invoke } from './api';

// curl -X POST \
// https://dev.ehealth.world/oauth/users/actions/init_factor \
//   -H 'authorization: Bearer MmRYT2xYN1h2T3YrZEpNYWtxK0JBQT09' \
// -H 'cache-control: no-cache' \
// -H 'content-type: application/json' \
// -H 'postman-token: badca7b2-5344-051a-c3fd-7ae8ad4533e7' \
// -d '{
// "factor": "+380771234567",
//   "type": "SMS"
// }'
export const initFactor = phone => invoke({
  endpoint: `${AUTH_URL}/oauth/users/actions/init_factor`,
  method: 'POST',
  types: ['factor/INIT_FACTOR_REQUEST', {
    type: 'factor/INIT_FACTOR_SUCCESS',
    meta: (action, state, res) =>
      res.clone().json().then(json => json.urgent),
    payload: (action, state, res) => res.clone().json().then(
      json => json.data
    ),

  }, 'factor/INIT_FACTOR_FAILURE'],
  body: {
    factor: `+38${phone}`,
    type: 'SMS',
  },
}, { auth: true });

// curl -X POST \
// https://dev.ehealth.world/oauth/users/actions/approve_factor \
//   -H 'authorization: Bearer RHdQY3dYWWE4RFAwZHlGeTRiQ004Zz09' \
// -H 'cache-control: no-cache' \
// -H 'content-type: application/json' \
// -H 'postman-token: 68c24ad0-0cef-fa9c-8c8f-95af13fe5b9d' \
// -d '{
// "otp": 4553
// }'
export const approveFactor = code => invoke({
  endpoint: `${AUTH_URL}/oauth/users/actions/approve_factor`,
  method: 'POST',
  types: ['factor/APPROVE_FACTOR_REQUEST', {
    type: 'factor/APPROVE_FACTOR_SUCCESS',
    meta: (action, state, res) =>
      res.clone().json().then(json => json.urgent),
    payload: (action, state, res) => res.clone().json().then(
      json => json.data
    ),

  }, 'factor/APPROVE_FACTOR_FAILURE'],
  body: {
    otp: code,
  },
}, { auth: true });
