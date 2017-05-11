import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { request } from 'schemas';
import { invoke } from './api';

export const APPROVED_STATUS = 'approve';
export const REJECT_REQUEST = 'reject';

export const fetchRequestById = id => invoke({
  endpoint: `${API_URL}/api/employee_requests/${id}`,
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

export const performActionWithRequest = (id, action) => invoke({
  endpoint: `${API_URL}/api/employee_requests/${id}/actions/${action}`,
  method: 'POST',
  types: [
    'requests/PERFORM_ACTION_WITH_REQUEST',
    'requests/PERFORM_ACTION_WITH_SUCCESS',
    'requests/PERFORM_ACTION_WITH_FAILURE',
  ],
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
