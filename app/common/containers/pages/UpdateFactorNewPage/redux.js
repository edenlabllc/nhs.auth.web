import { push } from 'react-router-redux';
import { initFactor } from 'redux/factors';
import { login } from 'redux/session';

export const onSubmit = ({ phone }) => dispatch =>
dispatch(initFactor(phone))
  .then((action) => {
    if (action.error) {
      return action;
    }
    dispatch(login(action.payload.value));
    return dispatch(push('/update-factor/phone/otp'));
  });
