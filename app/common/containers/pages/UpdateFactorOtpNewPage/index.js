import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';

import { H2 } from 'components/Title';
import OtpForm from 'containers/forms/OtpForm';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@connect(null, { onSubmit })
export default class UpdateFactorOtpNewPage extends React.Component {
  render() {
    const { onSubmit = () => {} } = this.props;

    return (
      <section className={styles.main} id="otp-page">
        <header className={styles.header}>
          <H2>Введіть код, що було надіслано на Ваш новий телефон</H2>
        </header>
        <article className={styles.form}>
          <OtpForm onSubmit={onSubmit} otp_old={false} />
        </article>
      </section>
    );
  }
}
