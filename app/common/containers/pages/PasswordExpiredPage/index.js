import React from "react";
import { connect } from "react-redux";
import withStyles from "withStyles";
import { withRouter } from "react-router";

import { H1, H2 } from "components/Title";
import Button, { ButtonsGroup } from "components/Button";
import ExpiredPasswordForm from "containers/forms/ExpiredPasswordForm";
import BackgroundLayout from "components/BackgroundLayout";

import { onSubmit } from "./redux";
import styles from "./styles.css";

@withRouter
@withStyles(styles)
@connect(null, { onSubmit })
export default class PasswordExpiredPage extends React.Component {
  render() {
    const { onSubmit = () => {}, router } = this.props;

    return (
      <section className={styles.main} id="otp-page">
        <header className={styles.header}>
          <BackgroundLayout />
          <H1>Введення нового паролю</H1>
          <br />
          <br />
          <H2 textTransform="initial" color="red">
            Введіть новий пароль та підтвердіть його
          </H2>
        </header>
        <article className={styles.form}>
          <ExpiredPasswordForm onSubmit={onSubmit} btnColor="green" />
          <ButtonsGroup>
            <Button theme="link" onClick={() => router.goBack()}>
              Назад
            </Button>
          </ButtonsGroup>
        </article>
      </section>
    );
  }
}
