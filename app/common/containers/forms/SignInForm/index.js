import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import Button from 'components/Button';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'sign-in-form',
  validate: reduxFormValidate({
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
    },
  }),
})
export default class SignInForm extends React.Component {
  render() {
    const { handleSubmit, onSubmit = () => {}, submitting } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field placeholder="E-mail" name="email" component={FieldInput} />
        </div>
        <div>
          <Field type="password" placeholder="Пароль" name="password" component={FieldInput} />
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
