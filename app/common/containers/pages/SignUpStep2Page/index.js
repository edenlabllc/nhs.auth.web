import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';

import { H1 } from 'components/Title';
import Points from 'components/Points';

import SignUpConfirmForm from 'containers/forms/SignUpConfirmForm';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@connect(null, { onSubmit })
export default class SignUpStep2Page extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <section className={styles.main} id="sign-up-page">
        <header className={styles.header}>
          <H1>Реєстрація</H1>

          <Points count={2} active={1} />
        </header>
        <article className={styles.content}>
          <p>
            Зверніть увагу, приймаючи запрошення, що <br />
            ви також даєте згоду на обробку своїх персональних данних
          </p>

          <div className={styles.form}>
            <SignUpConfirmForm
              onSubmit={() => (
                this.props.onSubmit(location.query.invite).then(() => (
                  this.props.router.push(`/invite/success${location.search}`)
                ))
              )}
            />
          </div>
        </article>
      </section>
    );
  }
}
