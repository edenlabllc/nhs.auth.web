import React from 'react';
import withStyles from 'withStyles';

import { H2 } from 'components/Title';
import Button from 'components/Button';

import styles from './styles.scss';

@withStyles(styles)
export default class UpdateFactorSuccessPage extends React.Component {
  render() {
    return (
      <section className={styles.main} id="success-page">
        <header className={styles.header}>
          <H2>Фактор було успішно змінено!</H2>
        </header>
        <article className={styles.form}>
          <Button color="blue" to="/sign-in">
            Повернутися до входу
          </Button>
        </article>
      </section>
    );
  }
}
