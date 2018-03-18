import React from "react";

import styles from "./styles.css";

export default ({ width }) => (
  <hr className={styles.line} style={{ width: `${width}px` }} />
);
