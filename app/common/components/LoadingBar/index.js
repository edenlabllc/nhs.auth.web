import React from "react";

import styles from "./styles.css";

export default class LoadingBar extends React.Component {
  static defaultProps = {
    speed: 3000,
    height: 20,
    classes: {
      wrap: styles.wrap,
      bar: styles.bar
    }
  };

  render() {
    return (
      <div className={this.props.classes.wrap}>
        <div
          className={this.props.classes.bar}
          style={{
            animationDuration: `${this.props.speed}ms`
          }}
        />
      </div>
    );
  }
}
