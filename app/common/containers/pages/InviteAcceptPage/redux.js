import { performActionWithRequest, APPROVED_STATUS } from 'redux/requests';
import { getLocation } from 'reducers';
import { push } from 'react-router-redux';

export const onSubmit = id => (dispatch, getState) => (
  dispatch(performActionWithRequest(id, APPROVED_STATUS))
  .then((action) => {
    if (action.error) return action;
    const state = getState();
    const location = getLocation(state);

    return dispatch([
      push({
        ...location,
        pathname: '/invite/success',
      }),
    ]);
  })
);
