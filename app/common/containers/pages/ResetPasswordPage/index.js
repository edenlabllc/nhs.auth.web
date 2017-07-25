import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';


import { H1, H3 } from 'components/Title';

import ResetPasswordForm from 'containers/forms/ResetPasswordForm';
import Button, { ButtonsGroup } from 'components/Button';

import { onSubmit } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@connect(null, { onSubmit })
export default class ResetPasswordPage extends React.Component {
  state = {
    isSend: false,
    email: '',
  };

  componentWillUnmount() {
    this.setState({
      isSend: false,
      email: '',
    });
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <section className={styles.main} id="reset-password-in-page">
        <header className={styles.header}>
          <H1>Сторінка відновлення паролю до eHealth</H1>
        </header>
        {
          !this.state.isSend && (
            <article className={styles.form}>
              <ResetPasswordForm
                onSubmit={(v) => {
                  this.setState({ email: v.email });
                  return onSubmit(v).then(a => !a.error && this.setState({ isSend: true }));
                }}
              />
            </article>
          )
        }
        { this.state.isSend && (<div className={styles.form}>
          <div className={styles.description}>
            <H3>На ваш email було надісладно листа для відновлення паролю</H3>
          </div>
          <ButtonsGroup>
            <Button color="blue" size="small" onClick={() => this.setState({ isSend: false })}>Назад</Button>
            <Button theme="link" onClick={() => onSubmit(this.state.email)}>Надіслати повторно</Button>
          </ButtonsGroup>
        </div>
        )}
      </section>
    );
  }
}
