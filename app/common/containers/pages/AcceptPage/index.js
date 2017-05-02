import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';

import Button from 'components/Button';

import { fetchClientById } from 'redux/clients';
import { fetchApproval } from 'redux/auth';
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
}), { fetchApproval })
export default class AcceptPage extends React.Component {
  state = {
    isLoading: false,
  };

  approval() {
    const { location: { query } } = this.props;

    this.setState({ isLoading: true });

    this.props.fetchApproval({
      clientId: query.client_id,
      scope: query.scope,
      redirectUri: query.redirect_uri,
    }).then(({ payload }) => {
      this.setState({ isLoading: false });
      window && (window.location.href = payload);
    });
  }

  render() {
    const { client = {}, user = {} } = this.props;

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

          <Button theme="link">Не ваша електронна адреса?</Button>
        </article>
        <footer className={styles.footer}>
          <div>
            <Button disabled={this.state.isLoading} onClick={() => this.approval()} color="blue">прийняти та продовжити</Button>
          </div>
          <div className={styles.links}>
            <div>
              <Button to="/conditions" theme="link">Угода Користувача</Button>
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
