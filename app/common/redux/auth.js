import { handleAction } from 'redux-actions';
import { AUTH_URL } from 'config';
import { invoke } from './api';

export const createSessionToken = body => invoke({
  endpoint: `${AUTH_URL}/oauth/tokens`,
  method: 'POST',
  types: ['auth/CREATE_SESSION_TOKEN_REQUEST', {
    type: 'auth/CREATE_SESSION_TOKEN_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => json.data
    ),
  }, 'auth/CREATE_SESSION_TOKEN_FAILURE'],
  body: {
    token: body,
  },
});


export const fetchSessionToken = token => invoke({
  endpoint: `${AUTH_URL}/admin/tokens/${token}/verify`,
  method: 'GET',
  types: ['auth/FETCH_SESSION_TOKEN_REQUEST', {
    type: 'auth/FETCH_SESSION_TOKEN_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => json.data
    ),
  }, 'auth/FETCH_SESSION_TOKEN_FAILURE'],
});

export const authorize = ({ clientId, scope, redirectUri }) => invoke({
  endpoint: `${AUTH_URL}/oauth/apps/authorize`,
  method: 'POST',
  types: ['auth/AUTHORIZE_REQUEST', {
    type: 'auth/AUTHORIZE_SUCCESS',
    payload: (action, state, res) => res.headers.get('location'),
  }, 'auth/AUTHORIZE_FAILURE'],
  body: {
    app: {
      client_id: clientId,
      redirect_uri: redirectUri,
      scope,
    },
  },
}, { auth: true });

export default handleAction(
  'auth/CREATE_SESSION_TOKEN_SUCCESS',
  'auth/FETCH_SESSION_TOKEN_REQUEST',
  (state, action) => ({
    ...state,
    ...action.payload,
  }),
  {}
);
