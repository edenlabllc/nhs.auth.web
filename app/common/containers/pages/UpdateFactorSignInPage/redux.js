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
      if (action.payload.response.error.message === 'User blocked.') {
        throw new SubmissionError({
          email: { user_blocked: true },
        });
      } else if (action.payload.response.error.message === 'Identity, password combination is wrong.') {
        // here different api response invalid_grant  || message
        throw new SubmissionError({
          password: { passwordMismatch: true },
        });
      } else if (action.payload.response.error.message === 'User not found.') {
        // here different api response invalid_grant === Identity not found.
        //  || message = 'User not found.'
        throw new SubmissionError({
          email: { identityMismatch: true },
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
