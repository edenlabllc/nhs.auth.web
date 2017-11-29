import { push } from 'react-router-redux';
import { initFactor } from 'redux/factors';
import { login } from 'redux/session';
import { getLocation } from 'reducers';
import { SubmissionError } from 'redux-form';

export const onSubmit = ({ phone }) => (dispatch, getState) =>
dispatch(initFactor(phone))
  .then((action) => {
    if (action.error) {
      const { type } = action.payload.response.error;
      if (type) {
        throw new SubmissionError({
          phone: {
            [type]: true,
          },
        });
      }
      return action;
    }

    dispatch(login(action.payload.value));
    const state = getState();
    const location = getLocation(state);
    if (location.query.invite) {
      return dispatch(push({ ...location, pathname: '/update-factor/phone/otp' }));
    }
    return dispatch(push('/update-factor/phone/otp'));
  });
