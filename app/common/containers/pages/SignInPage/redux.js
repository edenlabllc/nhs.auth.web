import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { getLocation } from 'reducers';
import { createSessionToken } from 'redux/auth';
import { fetchUserData } from 'redux/user';
import { login } from 'redux/session';
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
  if (action.error) return action;

  dispatch(login(action.payload.value));
  return dispatch(fetchUserData(action.payload.value));
}).then((action) => {
  if (action.error) {
    throw new SubmissionError({
      email: {
        accountPasswordMismatch: true,
      },
    });
  }
  const state = getState();
  const location = getLocation(state);

  return dispatch([
    push({
      ...location,
      pathname: '/accept',
    }),
  ]);
});
