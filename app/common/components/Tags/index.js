import React from "react";

import styles from "./styles.css";

const Component = ({ tags = [], formatter = i => i }) => (
  <div className={styles.list}>
    {tags.map((tag, idx) => (
      <div className={styles.item} key={idx}>
        {formatter(tag)}
      </div>
    ))}
  </div>
);

export default Component;
