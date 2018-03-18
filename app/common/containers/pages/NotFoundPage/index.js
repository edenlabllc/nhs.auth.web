import React from "react";
import withStyles from "withStyles";

import { H1 } from "components/Title";

import styles from "./styles.scss";

@withStyles(styles)
export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className={styles.error} id="not-found-page">
        <H1>ПОМИЛКА</H1>

        <div className={styles.code}>404</div>

        <H1 tag="h2">От халепа! Сторінки, що ви шукаєте тут немає</H1>

        <footer className={styles.footer}>
          При виникненні питань, будь ласка, зверніться в <br />
          <a href="mailto:support@test.com">службу підтримки</a>
        </footer>
      </div>
    );
  }
}
