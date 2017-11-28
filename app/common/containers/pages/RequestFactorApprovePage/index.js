import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';

import { H1 } from 'components/Title';
import OtpForm from 'containers/forms/OtpForm';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@connect(null, { onSubmit })
export default class RequestFactorOtpPage extends React.Component {
  render() {
    const {
      onSubmit = () => {},
    } = this.props;

    return (
      <section className={styles.main} id="otp-page">
        <header className={styles.header}>
          <H1>Вхід у систему eHealth</H1>
        </header>
        <article className={styles.form}>
          <OtpForm onSubmit={onSubmit} />
        </article>
      </section>
    );
  }
}
