import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { createSessionToken } from 'redux/auth';
import { login } from 'redux/session';
import { CLIENT_ID } from 'config';

export const onSubmit = ({ email, password }) => dispatch =>
  dispatch(createSessionToken({
    grant_type: 'password',
    email,
    password,
    client_id: CLIENT_ID,
    scope: 'app:authorize',
  }))
  .then((action) => {
    if (action.error) {
      if (action.payload.status === 401) {
        if (action.payload.response.error.message === 'User blocked.') {
          throw new SubmissionError({
            email: { userBlocked: true },
          });
        }
        return action;
      }
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
    return dispatch(push({ pathname: '/update-factor/otp' }));
  });
