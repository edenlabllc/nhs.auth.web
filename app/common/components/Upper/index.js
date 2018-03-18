import React from "react";
import withStyles from "nebo15-isomorphic-style-loader/lib/withStyles";

import styles from "./styles.css";

export default withStyles(styles)(({ children }) => (
  <span className={styles.upper}>{children}</span>
));
