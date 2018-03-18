import React from "react";
import withStyles from "withStyles";
import { withRouter } from "react-router";

import { H1 } from "components/Title";

import styles from "./styles.scss";

@withRouter
@withStyles(styles)
export default class InviteRejectPage extends React.Component {
  render() {
    return (
      <section className={styles.main} id="invite-reject-page">
        <H1>
          Вітаємо! <br />
          Запрошення відхилине
        </H1>
      </section>
    );
  }
}
