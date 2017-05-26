import React from 'react';
import keyByFn from 'lodash/keyBy';
import getFn from 'lodash/get';
import values from './values.json';

const valuesObject = keyByFn(values.data, 'name');

export default ({ dictionary, value }) =>
  <span>{getFn(valuesObject[dictionary], `values[${value}]`, value)}</span>;
