import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { otpVerifyToken, otpResendOtp } from 'redux/auth';
import { login } from 'redux/session';

export const onSubmit = ({ code }) => dispatch =>
  dispatch(otpVerifyToken(parseInt(code, 10)))
    .then((action) => {
      if (action.error) {
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
      return dispatch(push({ pathname: '/update-factor/phone' }));
    });

export const onResend = () => dispatch =>
  dispatch(otpResendOtp()).then((action) => {
    if (action.error) {
      return action;
    }
    dispatch(login(action.payload.value));
    return action;
  });
