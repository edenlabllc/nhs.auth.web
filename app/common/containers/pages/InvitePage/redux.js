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
          pathname: '/request-factor',
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
    const { message } = action.payload.response.error;
    if (message === 'User blocked.') {
      throw new SubmissionError({
        password: { user_blocked: true },
      });
    } else if (message === 'Identity, password combination is wrong.') {
      throw new SubmissionError({
        password: { passwordMismatch: true },
      });
    } else if (message === 'Sending OTP timeout. Try later.') {
      throw new SubmissionError({
        password: { otp_timeout: true },
      });
    } else if (message === 'SMS not send. Try later') {
      throw new SubmissionError({
        password: { resentOtp: true },
      });
    }
    return action;
  }

  const { next_step } = action.meta;
  dispatch(login(action.payload.value));

  switch (next_step) {
    case 'REQUEST_APPS': {
      return dispatch(push({ ...location, pathname: '/invite/accept' }));
    }

    case 'REQUEST_OTP': {
      const state = getState();
      const location = getLocation(state);
      return dispatch(push({ ...location, pathname: '/otp-send' }));
    }

    case 'RESEND_OTP': {
      throw new SubmissionError({
        email: { resentOtp: true },
      });
    }

    case 'REQUEST_FACTOR': {
      const state = getState();
      const location = getLocation(state);
      return dispatch(push({ ...location, pathname: '/request-factor' }));
    }

    default: {
      break;
    }
  }
  return true;
});
