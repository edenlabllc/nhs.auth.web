import { handleAction } from 'redux-actions';
import { API_URL } from 'config';
import { invoke } from './api';

export const fetchUserData = token => invoke({
  endpoint: `${API_URL}/tokens/${token}/user`,
  method: 'GET',
  types: ['user/FETCH_USER_REQUEST', {
    type: 'user/FETCH_USER_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => json.data
    ),
  }, 'user/FETCH_USER_FAILURE'],
});

export default handleAction(
  'user/FETCH_USER_SUCCESS',
  (state, action) => ({
    ...state,
    ...action.payload,
  }),
  null
);
