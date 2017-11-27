import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { getLocation } from 'reducers';
import { otpVerifyToken, otpResendOtp } from 'redux/auth';
import { fetchUserData } from 'redux/user';
import { login } from 'redux/session';

export const onSubmit = ({ code }) => (dispatch, getState) => {
  console.log('code', code);
  return dispatch(otpVerifyToken(parseInt(code, 10)))
    .then((action) => {
      if (action.error) {
        console.log('error', action);
        const { type } = action.payload.response.error;
        if (type === 'otp_invalid') {
          throw new SubmissionError({
            code: { wrongOtp: true },
          });
        } else if (type === 'otp_expired') {
          throw new SubmissionError({
            code: { otp_expired: true },
          });
        } else if (type === 'token_invalid') {
          throw new SubmissionError({
            code: { token_invalid: true },
          });
        } else if (type === 'otp_reached_max_attempts' || type === 'user_blocked') {
          throw new SubmissionError({
            code: { userBlocked: true },
          });
        }
        return action;
      }

      dispatch(login(action.payload.value));
      return dispatch(fetchUserData(action.payload.value)).then((action) => {
        if (action.error) {
          console.log('Error fetch user! ', action);
        }
        const state = getState();
        const location = getLocation(state);

        return dispatch(push({ ...location, pathname: '/accept' }));
      });
    });
};

export const onResend = () => (dispatch) => {
  console.log('Resent opt');
  return dispatch(otpResendOtp()).then((action) => {
    console.log('Resent opt', action);
    if (action.error) {
      return action;
    }
    dispatch(login(action.payload.value));
    return action;
  });
};
