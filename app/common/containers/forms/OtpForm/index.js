import React from 'react';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import FieldInput from 'components/reduxForm/FieldInput';
import Button, { ButtonsGroup } from 'components/Button';

import { reduxFormValidate, ErrorMessage } from 'react-nebo15-validate';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@reduxForm({
  form: 'otp-form',
  validate: reduxFormValidate({
    code: {
      required: true,
    },
  }),
})
export default class OtpForm extends React.Component {
  render() {
    const {
      handleSubmit,
      onResend = () => {},
      submitting,
      router,
    } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <Field
            placeholder="Введіть код, що прийшов на телефон"
            // labelText=""
            name="code"
            component={FieldInput}
          >
            <ErrorMessage when="wrongOtp">Не вірно введено код підтверження</ErrorMessage>
            <ErrorMessage when="resentOtp">Не вдалося відправити код. Повторіть спробу через декілька хвилин</ErrorMessage>
            <ErrorMessage when="otp_expired">Термін дії коду вичерпано. Спробуйте відправити знову.</ErrorMessage>
            <ErrorMessage when="token_invalid">
              Термін доступу користувача вичерпано. Радимо повернутися до попереднього кроку.
            </ErrorMessage>
          </Field>
        </div>
        <ButtonsGroup>
          <Button disabled={submitting} type="submit" color="blue">
            Ввести
          </Button>
          <Button disabled={submitting} theme="link" onClick={() => onResend()}>
            Відправити знову
          </Button>
          <Button disabled={submitting} theme="link" onClick={() => router.goBack()}>
            Назад
          </Button>
        </ButtonsGroup>
      </form>
    );
  }
}
