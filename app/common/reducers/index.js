import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import loading from 'redux/loading';
import session from 'redux/session';
import auth from 'redux/auth';
import clients from 'redux/clients';
import user from 'redux/user';
import requests from 'redux/requests';

import Aside from 'containers/blocks/Aside/redux';

const blocks = combineReducers({
  Aside,
});

const data = combineReducers({
  clients,
  user,
  requests,
});

export default combineReducers({
  blocks,
  session,
  auth,
  data,
  // external libraries
  form,
  routing,
  loading,
});

export const getLocation = state => state.routing.locationBeforeTransitions;
export const getForm = (state, formName) => state.form[formName];
export const getToken = state => state.session.token;

export const getUser = state => state.data.user;
export const getClientById = (state, id) => state.data.clients[id];
export const getRequestById = (state, id) => state.data.requests[id];
