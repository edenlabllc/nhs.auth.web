import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';
import format from 'date-fns/format';

import { H1 } from 'components/Title';
import Points from 'components/Points';

import InviteSignInForm from 'containers/forms/InviteSignInForm';
import InviteSignUpForm from 'containers/forms/InviteSignUpForm';

import { getRequestById } from 'reducers';

import { onSubmitSignUp, onSubmitSignIn } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@connect((state, { location: { query } }) => ({
  request: getRequestById(state, query.invite),
}), { onSubmitSignUp, onSubmitSignIn })
export default class SignUpPage extends React.Component {
  render() {
    const {
      request: { party = {}, legal_entity = {}, position, user_id } = {},
      location,
    } = this.props;

    return (
      <section className={styles.main} id="sign-up-page">
        {
          !user_id && <header className={styles.header}>
            <H1>Реєстрація</H1>

            <Points count={2} active={0} />
          </header>
        }
        <article className={styles.content}>
          <p>Я, {party.first_name} {party.second_name} {party.last_name}, {format(party.birth_date, 'DD/MM/YYYY')} р.н.</p>

          <div className={styles.accept}>
            даю згоду на обробку моїх даних та <br />
            реєстрацію мене як {position} <br />
            {legal_entity.name}
          </div>

          {user_id && <InviteSignInForm
            email={party.email}
            onSubmit={({ password }) => (
              this.props.onSubmitSignIn(
                party.email,
                password,
                location.query.invite,
              )
            )}
          />}

          {!user_id && <InviteSignUpForm
            email={party.email}
            onSubmit={({ password }) => (
              this.props.onSubmitSignUp(
                party.email,
                password,
              )
            )}
          />}
        </article>
      </section>
    );
  }
}
