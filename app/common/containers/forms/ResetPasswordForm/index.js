import React from 'react';
import withStyles from 'withStyles';
import { translate } from 'react-i18next';
import { reduxForm, Field } from 'redux-form';
import { ErrorMessage, reduxFormValidate } from 'react-nebo15-validate';

import FieldInput from 'components/reduxForm/FieldInput';
import Button, { ButtonsGroup } from 'components/Button';

import styles from './styles.scss';

@translate()
@withStyles(styles)
@reduxForm({
  form: 'reset-password-form',
  validate: reduxFormValidate({
    email: {
      required: true,
      email: true,
    },
  }),
})
export default class ResetPasswordForm extends React.Component {
  render() {
    const { handleSubmit, submitting, t } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <Field
            placeholder="Введіть свою адресу електронної пошти"
            name="email"
            component={FieldInput}
          >
            <ErrorMessage when="accountPasswordMismatch">{t('Email does register')}</ErrorMessage>
          </Field>
        </div>
        <ButtonsGroup>
          <Button disabled={submitting} type="submit" color="blue">
            далі
          </Button>
          <Button to="/sign-in">
            Назад
          </Button>
        </ButtonsGroup>
      </form>
    );
  }
}
