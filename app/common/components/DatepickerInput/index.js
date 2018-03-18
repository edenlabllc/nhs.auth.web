import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";

import libStyles from "./libStyles.css";

import Input from "../Input";

export const Component = ({ onBlur, maxDate, onChange, value, ...rest }) => (
  <DatePicker
    maxDate={maxDate}
    onChange={params => onChange(params.format())}
    onBlur={() => onBlur(value)}
    selected={value ? moment(value) : null}
    {...rest}
  />
);

export const DatePickerInput = ({ dateFormat, ...rest }) => (
  <Input component={Component} {...rest} dateFormat={dateFormat} />
);

export default DatePickerInput;
