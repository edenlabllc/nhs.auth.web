import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';

import { H2 } from 'components/Title';
import OtpForm from 'containers/forms/OtpForm';

import { onSubmit, onResend } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@connect(null, { onSubmit, onResend })
export default class UpdateOldFactorOtpPage extends React.Component {
  render() {
    const { onSubmit = () => {}, onResend = () => {} } = this.props;

    return (
      <section className={styles.main} id="otp-page">
        <header className={styles.header}>
          <H2>Введіть код, який було відправлено на Ваш існуючий телефон</H2>
        </header>
        <article className={styles.form}>
          <OtpForm onSubmit={onSubmit} onResend={onResend} />
        </article>
      </section>
    );
  }
}
