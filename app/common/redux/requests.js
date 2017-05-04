import { handleAction, combineActions } from 'redux-actions';
import { EMPLOYEE_API_URL } from 'config';
import { normalize } from 'normalizr';
import { request } from 'schemas';
import { invoke } from './api';

export const fetchRequestById = id => invoke({
  endpoint: `${EMPLOYEE_API_URL}/employee_requests/${id}`,
  method: 'GET',
  types: ['requests/FETCH_REQUEST_REQUEST', {
    type: 'requests/FETCH_REQUEST_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize({
        ...json.data,
        ...json.urgent || {},
      }, request)
    ),
  }, 'requests/FETCH_REQUEST_FAILURE'],
});

export const updateRequest = (id, body) => invoke({
  endpoint: `${EMPLOYEE_API_URL}/employee_requests/${id}`,
  method: 'PATCH',
  types: ['requests/UPDATE_REQUEST_REQUEST', {
    type: 'requests/UPDATE_REQUEST_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, request)
    ),
  }, 'requests/UPDATE_REQUEST_FAILURE'],
  body,
});

export default handleAction(
  combineActions(
    'requests/FETCH_REQUEST_SUCCESS',
    'requests/UPDATE_REQUEST_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.requests,
  }),
  null
);
