import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import nl2br from 'react-nl2br';
import { withRouter } from 'react-router';

import { H1 } from 'components/Title';
import Points from 'components/Points';

import InviteAcceptForm from 'containers/forms/InviteAcceptForm';

import { onSubmit, onReject } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@connect(null, { onSubmit, onReject })
export default class SignUpStep2Page extends React.Component {
  render() {
    const { onSubmit, onReject, location } = this.props;

    return (
      <section className={styles.main} id="sign-up-page">
        <header className={styles.header}>
          <H1>Прийняття Регламенту</H1>

          <Points count={2} active={1} />
        </header>
        <article className={styles.content}>
          <p>{
            nl2br('Приймаючи запрошення на роботу в системі eHealth ви також погоджуєтесь з положеннями Регламенту функціонування системи')
          }</p>

          <div className={styles.form}>
            <InviteAcceptForm onSubmit={() => onSubmit(location.query.invite)} />
          </div>
          <div className={styles.reject}>
            <button onClick={() => onReject(location.query.invite)}>Відхилити запрошення</button>
          </div>
        </article>
      </section>
    );
  }
}
