import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';

import FieldInput from 'components/reduxForm/FieldInput';
import Button, { ButtonsGroup } from 'components/Button';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

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
    const { handleSubmit, submitting } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <Field
            placeholder="Введіть адрес своєї електронної пошти"
            name="email"
            component={FieldInput}
          />
        </div>
        <ButtonsGroup>
          <Button disabled={submitting} type="submit" color="blue">
            далі
          </Button>
          <Button disabled={submitting} to="/sign-in">
            Назад
          </Button>
        </ButtonsGroup>
      </form>
    );
  }
}
