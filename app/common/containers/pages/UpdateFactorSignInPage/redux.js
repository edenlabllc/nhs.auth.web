import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { createSessionToken } from 'redux/auth';
import { login } from 'redux/session';
import { getLocation } from 'reducers';
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
      const { message = default_error } = action.payload.response.error;

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
