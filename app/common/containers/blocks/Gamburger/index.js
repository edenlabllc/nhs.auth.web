import React from "react";
import classnames from "classnames";

import styles from "./styles.css";

export default class Ganburger extends React.Component {
  render() {
    const { isOpen, onToggle } = this.props;

    return (
      <button
        onClick={() => onToggle()}
        className={classnames(styles.control, isOpen && styles.active)}
      >
        <span />
      </button>
    );
  }
}
