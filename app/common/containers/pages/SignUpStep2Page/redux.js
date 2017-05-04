import { updateRequest } from 'redux/requests';

export const onSubmit = id => dispatch => (
  dispatch(updateRequest(id, { status: 'APPROVED' }))
);
