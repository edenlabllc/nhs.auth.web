import { push } from 'react-router-redux';
import { getLocation } from 'reducers';
import { createSessionToken } from 'redux/auth';
import { login } from 'redux/session';
import { CLIENT_ID } from 'config';

export const onSubmit = ({ email, password }) => (dispatch, getState) => (
  dispatch(createSessionToken({
    grant_type: 'password',
    email,
    password,
    client_id: CLIENT_ID,
    scope: 'app:authorize',
  })).then((action) => {
    if (action.error) return new Error(action.error);
    const state = getState();
    const location = getLocation(state);

    return dispatch([
      login(action.payload.value),
      push({
        ...location,
        pathname: '/accept',
      }),
    ]);
  })
);
