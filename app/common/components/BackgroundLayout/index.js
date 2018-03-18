import React from "react";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";
import classnames from "classnames";
import styles from "./styles.css";

export const Component = ({ color = "love" }) => (
  <div className={classnames(styles.bg, styles[`color-${color}`])} />
);

export default withStyles(styles)(Component);
