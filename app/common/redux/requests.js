import { handleAction, combineActions } from "redux-actions";
import { API_URL } from "config";
import { normalize } from "normalizr";
import { request } from "schemas";
import { invoke } from "./api";

export const APPROVE_REQUEST_ACTION = "approve";
export const REJECT_REQUEST_ACTION = "reject";

export const fetchRequestByHash = hash =>
  invoke({
    endpoint: `${API_URL}/api/invite/${hash}`,
    method: "GET",
    types: [
      "requests/FETCH_REQUEST_REQUEST",
      {
        type: "requests/FETCH_REQUEST_SUCCESS",
        payload: (action, state, res) =>
          res.json().then(json =>
            normalize(
              {
                ...json.data,
                ...(json.urgent || {})
              },
              request
            )
          )
      },
      "requests/FETCH_REQUEST_FAILURE"
    ]
  });

export const performActionWithRequest = (id, action) =>
  invoke({
    endpoint: `${API_URL}/api/employee_requests/${id}/${action}`,
    method: "POST",
    types: [
      "requests/PERFORM_ACTION_WITH_REQUEST",
      "requests/PERFORM_ACTION_WITH_SUCCESS",
      "requests/PERFORM_ACTION_WITH_FAILURE"
    ]
  });

export default handleAction(
  combineActions(
    "requests/FETCH_REQUEST_SUCCESS",
    "requests/UPDATE_REQUEST_SUCCESS"
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.requests
  }),
  {}
);
