import { handleAction, combineActions } from 'redux-actions';
import { AUTH_URL } from 'config';
import { invoke } from './api';
import { fetchSessionToken } from './auth';

//
// export const fetchUserData = token => invoke({
//   endpoint: `${AUTH_URL}/admin/tokens/${token}/user`,
//   method: 'GET',
//   types: ['user/FETCH_USER_REQUEST', {
//     type: 'user/FETCH_USER_SUCCESS',
//     payload: (action, state, res) => res.json().then(
//       json => json.data
//     ),
//   }, 'user/FETCH_USER_FAILURE'],
// });

export const fetchUserData = token => dispatch =>
  dispatch(fetchSessionToken(token)).then((action) => {
    if (action.error) return action;
    if (new Date(action.payload.expires_at * 1000) < new Date()) {
      return {
        ...action,
        error: true,
      };
    }
    return dispatch(fetchUser(action.payload.user_id));
  });


export const createUser = (email, password) => invoke({
  endpoint: `${AUTH_URL}/admin/users`,
  method: 'POST',
  types: ['user/CREATE_USER_REQUEST', {
    type: 'user/CREATE_USER_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => json.data
    ),
  }, 'user/CREATE_USER_FAILURE'],
  body: {
    user: { email, password },
  },
});

export const fetchUser = userId => invoke({
  endpoint: `${AUTH_URL}/admin/users/${userId}`,
  method: 'GET',
  types: ['user/FETCH_USER_REQUEST', {
    type: 'user/FETCH_USER_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => json.data
    ),
  }, 'user/FETCH_USER_FAILURE'],
});

export default handleAction(
  combineActions(
  'user/FETCH_USER_SUCCESS',
  'user/CREATE_USER_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload,
  }),
  null
);
