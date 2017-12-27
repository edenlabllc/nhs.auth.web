import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { getLocation } from 'reducers';
import { newPasswordRequest } from 'redux/auth';
import { default_error } from 'helpers/errors';

export const onSubmit = ({ new_password }) => (dispatch, getState) =>
  dispatch(newPasswordRequest(new_password))
    .then((action) => {
      if (action.error) {
        const {
          message = default_error,
          invalid,
        } = action.payload.response.error;
        if (invalid && invalid[0].entry === '$.password') {
          throw new SubmissionError({
            new_password: {
              password_already_taken: true,
            },
          });
        } else if (message === 'Token expired') {
          throw new SubmissionError({
            new_password: {
              access_denied: true,
            },
          });
        }
      }

      const state = getState();
      const location = getLocation(state);
      return dispatch(push({
        ...location,
        pathname: '/update-password/success',
      }));
    });
