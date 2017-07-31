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
    alreadyUsed: false,
    tokenExpired: false,
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
            !this.state.updatePassword && (
              <NewPasswordForm
                onSubmit={v => onSubmit(v, this.props).then((code) => {
                  if (code === 422) {
                    return this.setState({ tokenExpired: true, updatePassword: true });
                  }
                  if (code === 404) {
                    return this.setState({ alreadyUsed: true, updatePassword: true });
                  }
                  return this.setState({ updatePassword: true });
                })}
              />
            )
          }
          {
            this.state.updatePassword && !this.state.tokenExpired && !this.state.alreadyUsed && (
              <div>
                <H3>Пароль успішно оновлено</H3>
                <div className={styles.description}>
                  <Button color="blue" to="/sign-in">Повернутися до входу</Button>
                </div>
              </div>
            )
          }
          {
            this.state.tokenExpired && (
              <div className={styles.description}>
                <Button color="blue" to="/sign-in">Вийшов час дії токену</Button>
              </div>
            )
          }
          {
            this.state.alreadyUsed && (
              <div>
                <H3>Упс, хтось вже скористався цією лінкою</H3>
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
