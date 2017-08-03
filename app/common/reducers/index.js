import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';
import session from 'redux/session';
import auth from 'redux/auth';
import clients from 'redux/clients';
import user from 'redux/user';
import userRoles from 'redux/userRoles';
import requests from 'redux/requests';
import dictionaries from 'redux/dictionaries';

import Aside from 'containers/blocks/Aside/redux';
import AcceptPage from 'containers/pages/AcceptPage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  AcceptPage,
});

const data = combineReducers({
  clients,
  user,
  userRoles,
  requests,
  dictionaries,
});

export default combineReducers({
  pages,
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
export const getClientById = (state, id) => denormalize(id, schemas.client, state.data);
export const getRequestById = (state, id) => denormalize(id, schemas.request, state.data);

export const getUserRoleById = (state, id) => denormalize(id, schemas.userRole, state.data);
export const getUserRoles = (state, ids) => denormalize(ids, [schemas.userRole], state.data);

export const getDictionary = (state, dictionary) =>
  denormalize(dictionary, schemas.dictionary, state.data);
