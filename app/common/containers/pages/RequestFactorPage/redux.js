import { push } from 'react-router-redux';
import { getLocation } from 'reducers';
import { initFactor } from 'redux/factors';
import { login } from 'redux/session';

export const onSubmit = ({ phone }) => (dispatch, getState) => {
  console.log('phone', phone);
  return dispatch(initFactor(phone))
    .then((action) => {
      if (action.error) {
        console.log('error', action);
        return action;
      }

      dispatch(login(action.payload.value));
      const state = getState();
      const location = getLocation(state);

      return dispatch(push({ ...location, pathname: '/request-factor/approve' }));
    });
};
