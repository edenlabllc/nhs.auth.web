import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { getLocation } from 'reducers';
import { createSessionToken } from 'redux/auth';
import { login } from 'redux/session';
import { fetchUserData } from 'redux/user';
import { CLIENT_ID } from 'config';
import error_messages, { default_error } from 'helpers/errors';

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
    const { message = default_error, type } = action.payload.response.error;
    if (type === 'password_expired') {
      throw new SubmissionError({
        password: {
          password_expired: true,
        },
      });
    //   const state = getState();
    //   const location = getLocation(state);
    //   const user_id =
    //     message.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]
    // {3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/)[0];
    //   return dispatch(push({
    //     query: {
    //       ...location.query,
    //       user_id,
    //     },
    //     pathname: '/sign-in/expiredPassword',
    //   }));
    }

    if (message) {
      throw new SubmissionError({
        email: {
          [error_messages[message]]: true,
        },
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
