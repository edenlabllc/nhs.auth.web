import React from 'react';
import classnames from 'classnames';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';

import Button from 'components/Button';

import { reduxFormValidate, ErrorMessage } from 'react-nebo15-validate';
import { password_validate } from 'helpers/validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'sign-up-form',
  validate: reduxFormValidate({
    password: {
      password_validate,
    },
    confirmPassword: {
      required: true,
      confirmation: 'password',
    },
    confirm: {
      required: true,
    },
  }),
})
export default class SignUpForm extends React.Component {
  render() {
    const { handleSubmit, onSubmit = () => {}, submitting, email } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
        <div>
          {email}
        </div>
        <div className={styles.fields}>
          <div className={styles.title}>
            <b>Створити пароль</b>
          </div>
          <div className={styles.field}>
            <Field type="password" placeholder="Пароль" name="password" component={FieldInput} />
          </div>
          <div className={styles.field}>
            <Field type="password" placeholder="Підтвердіть пароль" name="confirmPassword" component={FieldInput}>
              <ErrorMessage when="confirmation">Паролі не співпадають</ErrorMessage>
            </Field>
          </div>
        </div>
        <div className={styles.description}>
          Пароль має містити не менш ніж 8 символів
        </div>
        <div
          className={classnames(
            styles.description,
            styles.description_black
          )}
        >{`
        Зверніть увагу, що приймаючи запрошення, Ви погоджуєтесь на обробку
        Ваших персональних даних з метою забезпечення роботи в системі
        eHealth (електронній системі охорони здоров'я).
        `}
        </div>
        <div className={styles.confirm}>
          <Field labelText="Даю згоду на обробку моїх персональних даних в системі eHealth" type="checkbox" name="confirm" component={FieldCheckbox} />
        </div>
        <div className={styles.button}>
          <Button disabled={submitting} type="submit" color="blue">
            далі
          </Button>
        </div>
      </form>
    );
  }
}
