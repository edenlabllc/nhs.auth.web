import { performActionWithRequest, APPROVED_STATUS } from 'redux/requests';

export const onSubmit = id => dispatch => (
  dispatch(performActionWithRequest(id, APPROVED_STATUS))
);
