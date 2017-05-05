import { fetchSessionToken } from 'redux/auth';
import { createUser } from 'redux/user';
import { login } from 'redux/session';
import { updateRequest, APPROVED_STATUS } from 'redux/requests';

export const onSubmitSignUp = (email, password) => dispatch => (
  dispatch(createUser(email, password)).then(() => (
    dispatch(fetchSessionToken({
      grant_type: 'password',
      username: email,
      password,
      scope: 'apps:create',
    })).then(action => (
      dispatch(login(action.payload.value))
    ))
  ))
);

export const onSubmitSignIn = (email, password, requestId) => dispatch => (
  dispatch(fetchSessionToken({
    grant_type: 'password',
    username: email,
    password,
    scope: 'apps:create',
  })).then(action => (
    dispatch(login(action.payload.value))
  )).then(() => (
    updateRequest(requestId, { status: APPROVED_STATUS })
  ))
);
