import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { createSessionToken } from 'redux/auth';
import { login } from 'redux/session';
import { getLocation } from 'reducers';
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
      const { message } = action.payload.response.error;
      if (message === 'User blocked.') {
        throw new SubmissionError({
          email: { user_blocked: true },
        });
      } else if (message === 'Identity, password combination is wrong.') {
        throw new SubmissionError({
          email: { emailOrPasswordMismatch: true },
        });
      } else if (message === 'Sending OTP timeout. Try later.') {
        throw new SubmissionError({
          email: { otp_timeout: true },
        });
      } else if (message === 'SMS not send. Try later') {
        throw new SubmissionError({
          email: { resentOtp: true },
        });
      }
      return action;
    }
    const { next_step } = action.meta;
    if (next_step !== 'REQUEST_OTP') {
      throw new SubmissionError({
        email: {
          notAllowed: true,
        },
      });
    }
    dispatch(login(action.payload.value));
    const state = getState();
    const location = getLocation(state);
    return dispatch(push({ ...location, pathname: '/update-factor/otp' }));
  });
