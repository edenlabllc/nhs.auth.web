import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';

import { H1, H3 } from 'components/Title';
import Button from 'components/Button';

import NewPasswordForm from 'containers/forms/NewPasswordForm';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@connect(null, { onSubmit })
export default class NewPasswordPage extends React.Component {
  state = {
    updatePassword: false,
  };

  render() {
    const { onSubmit } = this.props;

    return (
      <section className={styles.main} id="sign-in-page">
        <header className={styles.header}>
          <H1>Сторінка відновлення паролю до eHealth</H1>
        </header>
        <article className={styles.form}>
          {
            !this.state.updatePassword ? (
              <NewPasswordForm
                onSubmit={v => onSubmit(v, this.props).then(() =>
                  this.setState({ updatePassword: true }))}
              />
            ) : (
              <div>
                <H3>Пароль успішно оновлено</H3>
                <div className={styles.description}>
                  <Button color="blue" to="/sign-in">Повернутися до входу</Button>
                </div>
              </div>
            )
          }
        </article>
      </section>
    );
  }
}
