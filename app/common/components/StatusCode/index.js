import React from "react";
import classnames from "classnames";

import styles from "./styles.css";

const StatusCode = ({ code }) => (
  <span
    className={classnames(
      code < 300 && styles.success,
      code >= 300 && code < 400 && styles.warning,
      code >= 400 && styles.danger
    )}
  >
    {code}
  </span>
);

export default StatusCode;
