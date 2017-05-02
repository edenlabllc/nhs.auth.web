import { handleAction } from 'redux-actions';
import { API_URL, CLIENT_ID } from 'config';
import { invoke } from './api';

export const fetchSessionToken = body => invoke({
  endpoint: `${API_URL}/tokens`,
  method: 'POST',
  types: ['auth/FETCH_SESSION_TOKEN_REQUEST', {
    type: 'auth/FETCH_SESSION_TOKEN_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => json.data
    ),
  }, 'auth/FETCH_SESSION_TOKEN_FAILURE'],
  body: { ...body, client_id: CLIENT_ID },
});

export const fetchApproval = ({ clientId, scope, redirectUri }) => invoke({
  endpoint: `${API_URL}/apps`,
  method: 'POST',
  types: ['auth/FETCH_APPROVAL_REQUEST', {
    type: 'auth/FETCH_APPROVAL_SUCCESS',
    payload: (action, state, res) => res.headers.get('location'),
  }, 'auth/FETCH_APPROVAL_FAILURE'],
  body: {
    approval: {
      client_id: clientId,
      scope,
    },
    redirect_uri: redirectUri,
  },
}, { auth: true });

export default handleAction(
  'auth/FETCH_SESSION_TOKEN_SUCCESS',
  (state, action) => ({
    ...state,
    ...action.payload,
  }),
  {}
);
