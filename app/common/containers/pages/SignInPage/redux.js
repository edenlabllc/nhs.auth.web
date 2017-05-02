import { fetchSessionToken } from 'redux/auth';
import { login } from 'redux/session';

export const onSubmit = ({ email, password }) => dispatch => (
  dispatch(fetchSessionToken({
    grant_type: 'password',
    username: email,
    password,
    scope: 'apps:create',
  })).then(action => (
    dispatch(login(action.payload.value))
  ))
);
