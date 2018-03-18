import React from "react";

import { withRouter } from "react-router";

import { H1 } from "../../../components/Title";

import styles from "./styles.css";

@withRouter
export default class InviteSuccessPage extends React.Component {
  render() {
    return (
      <section className={styles.main} id="invite-success-page">
        <H1>
          Вітаємо! <br />
          Запрошення прийняте
        </H1>
      </section>
    );
  }
}
