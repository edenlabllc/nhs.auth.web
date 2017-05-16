import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import withStyles from 'withStyles';

import { H1 } from 'components/Title';

import { fetchRequestById } from 'redux/requests';
import { getRequestById } from 'reducers';

import styles from './styles.scss';

@provideHooks({
  fetch: ({ dispatch, location: { query } }) => dispatch(fetchRequestById(query.invite)),
})
@withStyles(styles)
@connect((state, { location: { query } }) => ({
  request: getRequestById(state, query.invite),
}))
export default class InviteLayout extends React.Component {
  get routeScopes() {
    return this.props.routes[this.props.routes.length - 1].inviteStatuses || [];
  }
  renderError() {
    return (
      <section className={styles.main} id="invite-layout">
        <H1>
          Помилка! <br />
          Запрошення вже використано
        </H1>
      </section>
    );
  }
  render() {
    const { request, children } = this.props;
    if (this.routeScopes.indexOf(request.status) === -1) return this.renderError();
    return children;
  }
}
