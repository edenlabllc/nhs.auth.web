import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';

import * as fetchRequest from 'redux/requests';

export const showRequest = createAction('inviteLayout/SHOW_INVITE');

export const fetchRequestByHash = hash => dispatch =>
  dispatch(fetchRequest.fetchRequestByHash(hash)).then((action) => {
    if (action.error) throw action;
    return dispatch(showRequest(action.payload.result));
  });

const request = handleAction(
  showRequest,
  (state, action) => action.payload,
  {}
);

export default combineReducers({
  request,
});
