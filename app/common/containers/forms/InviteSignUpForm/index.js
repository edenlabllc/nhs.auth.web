import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import FieldCheckbox from 'components/reduxForm/FieldCheckbox';

import Button from 'components/Button';

import { reduxFormValidate, ErrorMessage } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'sign-up-form',
  validate: reduxFormValidate({
    password: {
      required: true,
      minLength: 8,
    },
    confirmPassword: {
      required: true,
      minLength: 8,
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
        <div>
          <b>Створити пароль</b>
        </div>
        <div>
          <Field type="password" placeholder="Пароль" name="password" component={FieldInput} />
        </div>
        <div>
          <Field type="password" placeholder="Підтвердіть пароль" name="confirmPassword" component={FieldInput}>
            <ErrorMessage when="confirmation">Паролі не співпадають</ErrorMessage>
          </Field>
        </div>
        <div className={styles.description}>
          Пароль має містити не менш ніж 8 символів
        </div>
        <div>
          <Field labelText="Даю згоду на обробку моїх персональних даних в системі eHealth" type="checkbox" name="confirm" component={FieldCheckbox} />
        </div>
        <div>
          <Button disabled={submitting} type="submit" color="blue">
            далі
          </Button>
        </div>
      </form>
    );
  }
}
