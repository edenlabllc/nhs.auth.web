import React from "react";
import withStyles from "withStyles";

import styles from "./styles.scss";

export default withStyles(styles)(({ count = 2, active = 0 }) => (
  <ul className={styles.points}>
    {new Array(null, count).map((
      item,
      i // eslint-disable-line
    ) => <li key={i} className={active === i ? styles.active : ""} />)}
  </ul>
));
