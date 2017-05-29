import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { dictionary } from 'schemas';
import { createUrl } from 'helpers/url';
import { invoke } from './api';

export const APPROVED_STATUS = 'approve';
export const REJECT_REQUEST = 'reject';

export const fetchDictionaries = (options, { useCache = false } = {}) => invoke({
  endpoint: createUrl(`${API_URL}/api/dictionaries`, options),
  method: 'GET',
  bailout: state => useCache && state.data.dictionaries,
  types: ['dictionaries/FETCH_DICTIONARIES_REQUEST', {
    type: 'dictionaries/FETCH_DICTIONARIES_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, [dictionary]),
    ),
  }, 'dictionaries/FETCH_DICTIONARIES_FAILURE'],
});

export default handleAction(
  combineActions(
    'dictionaries/FETCH_DICTIONARIES_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.dictionaries,
  }),
  null,
);
