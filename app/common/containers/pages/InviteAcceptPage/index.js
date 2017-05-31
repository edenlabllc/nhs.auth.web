import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import nl2br from 'react-nl2br';
import { withRouter } from 'react-router';

import { H1 } from 'components/Title';
import Points from 'components/Points';

import InviteAcceptForm from 'containers/forms/InviteAcceptForm';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@connect(null, { onSubmit })
export default class SignUpStep2Page extends React.Component {
  render() {
    const { onSubmit, location } = this.props;

    return (
      <section className={styles.main} id="sign-up-page">
        <header className={styles.header}>
          <H1>Прийняти запрошення</H1>

          <Points count={2} active={1} />
        </header>
        <article className={styles.content}>
          <p>{
            nl2br(`Зверніть увагу, що приймаючи запрошення,
            Ви погоджуєтесь з положеннями
            Регламенту функціонування системи eHealth
            та надаєте згоду адміністратору системи
            на обробку Ваших персональних даних з
            метою забезпечення роботи в системі eHealth
            (електронній системі охорони здоров'я).`)
          }</p>

          <div className={styles.form}>
            <InviteAcceptForm onSubmit={() => onSubmit(location.query.invite)} />
          </div>
        </article>
      </section>
    );
  }
}
