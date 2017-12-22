import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { getLocation } from 'reducers';
import { createSessionToken } from 'redux/auth';
import { fetchUserData } from 'redux/user';
import { login } from 'redux/session';
import { CLIENT_ID } from 'config';

export const onSubmit = ({ email, password }) => (dispatch, getState) =>
dispatch(createSessionToken({
  grant_type: 'password',
  email,
  password,
  client_id: CLIENT_ID,
  scope: 'app:authorize',
}))
.then((action) => {
  if (action.error) {
    const { message, type } = action.payload.response.error;
    if (type === 'password_expired') {
      const state = getState();
      const location = getLocation(state);
      const user_id =
        message.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/)[0];
      return dispatch(push({
        query: {
          ...location.query,
          user_id,
        },
        pathname: '/sign-in/expiredPassword',
      }));
    }

    if (message === 'User blocked.') {
      throw new SubmissionError({
        email: { user_blocked: true },
      });
    } else if (message === 'Identity, password combination is wrong.') {
      throw new SubmissionError({
        email: { emailOrPasswordMismatch: true },
      });
    } else if (message === 'SMS not send. Try later') {
      throw new SubmissionError({
        email: { resentOtp: true },
      });
    } else if (message === 'Sending OTP timeout. Try later.') {
      throw new SubmissionError({
        email: { otp_timeout: true },
      });
    }
    return action;
  }
  const { next_step } = action.meta;
  dispatch(login(action.payload.value));

  switch (next_step) {
    case 'REQUEST_APPS': {
      return dispatch(fetchUserData(action.payload.value)).then((action) => {
        if (action.error) {
          throw new SubmissionError({
            email: { accountPasswordMismatch: true },
          });
        }
        const state = getState();
        const location = getLocation(state);

        return dispatch(push({ ...location, pathname: '/accept' }));
      });
    }

    case 'REQUEST_OTP': {
      const state = getState();
      const location = getLocation(state);
      return dispatch(push({ ...location, pathname: '/otp-send' }));
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
