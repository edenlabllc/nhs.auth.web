import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';

import { H1 } from 'components/Title';

import NewPasswordForm from 'containers/forms/NewPasswordForm';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@connect(null, { onSubmit })
export default class NewPasswordPage extends React.Component {
  render() {
    const { onSubmit } = this.props;

    return (
      <section className={styles.main} id="sign-in-page">
        <header className={styles.header}>
          <H1>Сторінка відновлення паролю до eHealth</H1>
        </header>
        <article className={styles.form}>
          <NewPasswordForm
            onSubmit={v => onSubmit(v, this.props)}
          />
        </article>
      </section>
    );
  }
}
