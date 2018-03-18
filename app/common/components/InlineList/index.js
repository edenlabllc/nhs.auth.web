import React from "react";

import styles from "./styles.css";

export default ({ list = [], separator = "," }) => (
  <ul className={styles.list}>
    {list.map((name, i) => (
      <li key={i}>
        {name}
        {i !== list.length - 1 && separator}
      </li>
    ))}
  </ul>
);
