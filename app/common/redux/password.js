import { AUTH_URL } from 'config';
import { invoke } from './api';

export const passwordRecoveryRequest = email => invoke({
  endpoint: `${AUTH_URL}/api/credentials_recovery_requests`,
  method: 'POST',
  types: ['auth/CREATE_PASSWORD_RECOVERY_REQUEST', {
    type: 'auth/CREATE_PASSWORD_RECOVERY_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => json.data
    ),
  }, 'auth/CREATE_PASSWORD_RECOVERY_FAILURE'],
  body: {
    credentials_recovery_request: {
      email,
    },
  },
});

export const newPasswordRequest = (id, body) => invoke({
  endpoint: `${AUTH_URL}/api/credentials_recovery_requests/${id}/actions/reset_password`,
  method: 'PATCH',
  types: ['auth/CREATE_NEW_PASSWORD_REQUEST', {
    type: 'auth/CREATE_NEW_PASSWORD_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => json.data
    ),
  }, 'auth/CREATE_NEW_PASSWORD_FAILURE'],
  body: {
    user: body,
  },
});
