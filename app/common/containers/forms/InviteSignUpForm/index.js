import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import Button from 'components/Button';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'sign-up-form',
  validate: reduxFormValidate({
    password: {
      required: true,
      minLength: 8,
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
        <div className={styles.description}>
          Пароль має містити не менш ніж 8 символів
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
