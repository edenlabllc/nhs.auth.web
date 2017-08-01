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
  constructor(props) {
    super(props);
    this.state = {
      code: false,
    };
    this.onAction = this.onAction.bind(this);
  }
  componentWillUnmount() {
    this.setState({ code: false });
  }
  onAction(action) {
    if (action.error) {
      return this.setState({
        code: action.payload.status,
      });
    }
    return this.setState({ code: 200 });
  }

  render() {
    const { onSubmit } = this.props;

    return (
      <section className={styles.main} id="sign-in-page">
        <header className={styles.header}>
          <H1>Сторінка відновлення паролю до eHealth</H1>
        </header>
        <article className={styles.form}>
          {
            !this.state.code && (
              <NewPasswordForm
                onSubmit={v => onSubmit(v, this.props).then(action => this.onAction(action))}
              />
            )
          }
          {
            this.state.code === 200 && (
              <div>
                <H3>Пароль успішно оновлено</H3>
                <div className={styles.description}>
                  <Button color="blue" to="/sign-in">Повернутися до входу</Button>
                </div>
              </div>
            )
          }
          {
            this.state.code === 422 && (
              <div>
                <H3>Вийшов час дії токену</H3>
                <div className={styles.description}>
                  <Button color="blue" to="/sign-in">Повернутися до входу</Button>
                </div>
              </div>
            )
          }
          {
            this.state.code === 404 && (
              <div>
                <H3>Дана ссилка на відновлення паролю не дійсна</H3>
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
