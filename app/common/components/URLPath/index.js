import React from "react";

import styles from "./styles.css";

const URLPath = ({ children }) => (
  <span>
    {children &&
      String(children)
        .split("/")
        .map((i, index) => (
          <span key={index} className={styles.item}>
            {index > 0 ? "/" : ""}
            {i}
          </span>
        ))}
  </span>
);

export default URLPath;
