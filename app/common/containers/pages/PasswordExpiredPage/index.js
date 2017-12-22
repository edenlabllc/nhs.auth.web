import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';

import { H1 } from 'components/Title';
import Button, { ButtonsGroup } from 'components/Button';
import ExpiredPasswordForm from 'containers/forms/ExpiredPasswordForm';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@connect(null, { onSubmit })
export default class PasswordExpiredPage extends React.Component {
  render() {
    const { onSubmit = () => {}, router, location } = this.props;

    return (
      <section className={styles.main} id="otp-page">
        <header className={styles.header}>
          <H1>Ваш пароль застарів</H1>
        </header>
        <article className={styles.form}>
          <ExpiredPasswordForm
            onSubmit={({ current_password, password }) =>
              onSubmit(
                location.query.user_id,
                { current_password, password }
              )
            }
          />
          <ButtonsGroup>
            <Button
              theme="link"
              onClick={() => router.goBack()}
            >
              Назад
            </Button>
          </ButtonsGroup>
        </article>
      </section>
    );
  }
}
