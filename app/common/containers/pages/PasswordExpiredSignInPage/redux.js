import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { getLocation } from 'reducers';
import { passwordUpdateRequest } from 'redux/auth';
import { CLIENT_ID } from 'config';
import { login } from 'redux/session';
import error_messages, { default_error } from 'helpers/errors';

export const onSubmit = ({ email, password }) => (dispatch, getState) =>
dispatch(passwordUpdateRequest({
  grant_type: 'change_password',
  scope: 'user:change_password',
  client_id: CLIENT_ID,
  email,
  password,
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

  dispatch(login(action.payload.data.value));
  const state = getState();
  const location = getLocation(state);

  return dispatch(push({
    ...location,
    pathname: 'update-password/new',
  }));
});
