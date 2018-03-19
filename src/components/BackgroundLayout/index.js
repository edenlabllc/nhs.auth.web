import React from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

export const Component = ({ color = "love" }) => (
  <div className={classnames(styles.bg, styles[`color-${color}`])} />
);

export default Component;