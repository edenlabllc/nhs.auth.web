import { updateRequest, APPROVED_STATUS } from 'redux/requests';

export const onSubmit = id => dispatch => (
  dispatch(updateRequest(id, { status: APPROVED_STATUS }))
);
