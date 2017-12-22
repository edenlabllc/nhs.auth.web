import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { getLocation } from 'reducers';
import { updatePassword } from 'redux/auth';
import { fetchUserData } from 'redux/user';
import { login } from 'redux/session';

export const onSubmit = (user_id, body) => (dispatch, getState) =>
  dispatch(updatePassword(user_id, body))
    .then((action) => {
      if (action.error) {
        // const { type } = action.payload.response.error;
        console.log(action.payload);
        // This password has been used recently. Try another one
        throw new SubmissionError({
          password: {
            password_already_taken: true,
          },
        });
      }

      dispatch(login(action.payload.value));
      return dispatch(fetchUserData(action.payload.value)).then((action) => {
        if (action.error) {
          return action;
        }
        const state = getState();
        const location = getLocation(state);
        return dispatch(push({
          ...location,
          pathname: location.query.invite ?
            '/invite/accept' : '/accept',
        }));
      });
    });
