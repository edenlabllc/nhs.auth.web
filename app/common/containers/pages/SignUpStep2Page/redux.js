import { setRequestStatus, APPROVED_STATUS } from 'redux/requests';

export const onSubmit = id => dispatch => (
  dispatch(setRequestStatus(id, APPROVED_STATUS))
);
