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
import requests from 'redux/requests';
import dictionaries from 'redux/dictionaries';

import Aside from 'containers/blocks/Aside/redux';

const blocks = combineReducers({
  Aside,
});

const data = combineReducers({
  clients,
  user,
  requests,
  dictionaries,
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
export const getClientById = (state, id) => denormalize(id, schemas.client, state.data);
export const getRequestById = (state, id) => denormalize(id, schemas.request, state.data);

export const getDictionary = (state, dictionary) =>
  denormalize(dictionary, schemas.dictionary, state.data);
