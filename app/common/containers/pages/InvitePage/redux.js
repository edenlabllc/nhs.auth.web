import { push } from 'react-router-redux';
import { getLocation } from 'reducers';
import { createSessionToken } from 'redux/auth';
import { createUser } from 'redux/user';
import { login } from 'redux/session';
import { CLIENT_ID } from 'config';
import { performActionWithRequest, APPROVED_STATUS } from 'redux/requests';

export const onSubmitSignUp = (email, password) => (dispatch, getState) => (
  dispatch(createUser(email, password)).then((action) => {
    if (action.error) return new Error(action.error);

    return dispatch(createSessionToken({
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
          pathname: '/invite/step-2',
        }),
      ]);
    });
  })
);

export const onSubmitSignIn = (email, password, requestId) => (dispatch, getState) => (
  dispatch(createSessionToken({
    grant_type: 'password',
    email,
    password,
    client_id: CLIENT_ID,
    scope: 'app:authorize',
  })).then((action) => {
    if (action.error) throw action;
    return dispatch(login(action.payload.value));
  }).then((action) => {
    if (action.error) throw action;
    return dispatch(performActionWithRequest(requestId, APPROVED_STATUS));
  }).then((action) => {
    if (action.error) throw action;

    const state = getState();
    const location = getLocation(state);

    return dispatch([
      login(action.payload.value),
      push({
        ...location,
        pathname: '/invite/success',
      }),
    ]);
  })
  .catch(err => err)
);
