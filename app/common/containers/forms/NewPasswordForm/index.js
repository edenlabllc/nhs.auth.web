import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import Button from 'components/Button';

import { reduxFormValidate, ErrorMessage } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'new-password-form',
  validate: reduxFormValidate({
    password: {
      required: true,
    },
    confirm_password: {
      required: true,
      confirmation: 'password',
    },
  }),
})
export default class NewPasswordForm extends React.Component {
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <Field
            placeholder="Введіть новий пароль"
            name="password"
            type="password"
            component={FieldInput}
          />
        </div>
        <div>
          <Field
            placeholder="Повторіть новий пароль"
            name="confirm_password"
            type="password"
            component={FieldInput}
          >
            <ErrorMessage when="confirmation">Паролі не співпадаюсть</ErrorMessage>
          </Field>
        </div>
        <div>
          <Button disabled={submitting} type="submit" color="blue">
            Зберегти новий пароль
          </Button>
        </div>
      </form>
    );
  }
}
