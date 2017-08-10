import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { getLocation } from 'reducers';
import { createSessionToken } from 'redux/auth';
import { createUserFromRequest } from 'redux/user';
import { login } from 'redux/session';
import { CLIENT_ID } from 'config';

export const onSubmitSignUp = (employeeRequestId, email, password) => (dispatch, getState) => (
  dispatch(createUserFromRequest(employeeRequestId, { password })).then((action) => {
    if (action.error) return new Error(action.error);

    return dispatch(createSessionToken({
      grant_type: 'password',
      email,
      password,
      client_id: CLIENT_ID,
      scope: 'employee_request:approve employee_request:reject',
    })).then((action) => {
      if (action.error) return new Error(action.error);

      const state = getState();
      const location = getLocation(state);

      return dispatch([
        login(action.payload.value),
        push({
          ...location,
          pathname: '/invite/accept',
        }),
      ]);
    });
  })
);

export const onSubmitSignIn = (employeeRequestId, email, password) => (dispatch, getState) =>
dispatch(createSessionToken({
  grant_type: 'password',
  email,
  password,
  client_id: CLIENT_ID,
  scope: 'employee_request:approve employee_request:reject',
})).then((action) => {
  if (action.error) {
    throw new SubmissionError({
      password: {
        passwordMismatch: true,
      },
    });
  }

  const state = getState();
  const location = getLocation(state);

  return dispatch([
    login(action.payload.value),
    push({
      ...location,
      pathname: '/invite/accept',
    }),
  ]);
});
