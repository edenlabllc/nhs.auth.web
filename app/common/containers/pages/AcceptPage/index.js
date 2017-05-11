import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';

import Button from 'components/Button';

import { fetchClientById } from 'redux/clients';
import { authorize } from 'redux/auth';
import { getClientById, getUser } from 'reducers';

import styles from './styles.scss';

@provideHooks({
  fetch: ({ dispatch, location: { query } }) => dispatch(fetchClientById(query.client_id)),
})
@withRouter
@withStyles(styles)
@connect((state, { location: { query } }) => ({
  client: getClientById(state, query.client_id),
  user: getUser(state),
}), { authorize })
export default class AcceptPage extends React.Component {
  state = {
    isLoading: false,
  };

  approval() {
    const { location: { query } } = this.props;

    this.setState({ isLoading: true });

    this.props.authorize({
      clientId: query.client_id,
      scope: query.scope,
      redirectUri: query.redirect_uri,
    }).then(({ payload }) => {
      this.setState({ isLoading: false });
      window && (window.location.href = payload);
    });
  }

  renderNotFoundClientId() {
    return (
      <section className={styles.main} id="accept-page">
        <header className={styles.header}>
          <b>Помилка</b>
        </header>
        <article className={styles.content}>
          <p>Не вказан идентифікатор додатку для авторизації</p>
        </article>
      </section>
    );
  }
  renderNotFoundScope() {
    return (
      <section className={styles.main} id="accept-page">
        <header className={styles.header}>
          <b>Помилка</b>
        </header>
        <article className={styles.content}>
          <p>Не вказані параметри доступу до данних</p>
        </article>
      </section>
    );
  }
  renderNotFoundRedirectUri() {
    return (
      <section className={styles.main} id="accept-page">
        <header className={styles.header}>
          <b>Помилка</b>
        </header>
        <article className={styles.content}>
          <p>Не вказано адресу зворотнього визову</p>
        </article>
      </section>
    );
  }
  render() {
    const {
      client = {},
      user = {},
      location: { query: { client_id, scope, redirect_uri } },
    } = this.props;

    if (!client_id) return this.renderNotFoundClientId();
    if (!scope) return this.renderNotFoundScope();
    if (!redirect_uri) return this.renderNotFoundRedirectUri();

    return (
      <section className={styles.main} id="accept-page">
        <header className={styles.header}>
          <b>{client.name}</b> отримає наступну інформацію:
          вашу електронну адресу та дані e-health-акаунту
        </header>
        <article className={styles.content}>
          <p>
            {user.email}
          </p>

          {/* <Button theme="link">Не ваша електронна адреса?</Button> */}
        </article>
        <footer className={styles.footer}>
          <div>
            <Button disabled={this.state.isLoading} onClick={() => this.approval()} color="blue">прийняти та продовжити</Button>
          </div>
          <div className={styles.links}>
            <div>
              <Button to="/conditions" theme="link">Угода користувача</Button>
            </div>
            <div>
              <Button to="/conditions" theme="link">Умови використання</Button>
            </div>
          </div>
        </footer>
      </section>
    );
  }
}
