import React from "react";

import styles from "./styles.module.css";

export default ({ count = 2, active = 0 }) => (
  <ul className={styles.points}>
    {new Array(null, count).map((
      item,
      i // eslint-disable-line
    ) => <li key={i} className={active === i ? styles.active : ""} />)}
  </ul>
);
