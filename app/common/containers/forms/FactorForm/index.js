import React from 'react';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { reduxFormValidate } from 'react-nebo15-validate';

import Button, { ButtonsGroup } from 'components/Button';
import FieldMasked from 'components/reduxForm/FieldMasked';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@reduxForm({
  form: 'factor-form',
  validate: reduxFormValidate({
    phone: {
      required: true,
      phone_number: () => /^\d{9}$/,
    },
  }),
})
export default class FactorForm extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      router,
    } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <Field
            labelText="Введіть номер телефона, що буде використано для реєстрации"
            type="tel"
            name="phone"
            placeholder="+380 XX XXX XX XX"
            mask="+380 11 111 11 11"
            component={FieldMasked}
          />
        </div>
        <ButtonsGroup>
          <Button disabled={submitting} type="submit" color="blue">
            Ввести
          </Button>
          <Button disabled={submitting} theme="link" onClick={() => router.goBack()}>
            Назад
          </Button>
        </ButtonsGroup>
      </form>
    );
  }
}
