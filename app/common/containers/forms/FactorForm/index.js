import React from 'react';

import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { FormBlock } from 'components/Form';
import Button, { ButtonsGroup } from 'components/Button';
import FieldMasked from 'components/reduxForm/FieldMasked';

import { reduxFormValidate, ErrorMessage } from 'react-nebo15-validate';

@withRouter
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
      <form onSubmit={handleSubmit}>
        <FormBlock>
          <div>
            <Field
              labelText="Введіть номер телефона, що буде використано для авторизації"
              type="tel"
              name="phone"
              placeholder="+380 XX XXX XX XX"
              mask="+380 11 111 11 11"
              component={FieldMasked}
            >
              <ErrorMessage when="access_denied">
                Термін доступу користувача вичерпано. Радимо повернутися до попереднього кроку.
              </ErrorMessage>
              <ErrorMessage when="token_invalid_type">
                Термін cecії користувача вичерпано. Радимо повернутися до попереднього кроку
              </ErrorMessage>
            </Field>
          </div>
          <ButtonsGroup>
            <Button disabled={submitting} type="submit" color="blue">
              Ввести
            </Button>
            <Button disabled={submitting} theme="link" onClick={() => router.goBack()}>
              Назад
            </Button>
          </ButtonsGroup>
        </FormBlock>
      </form>
    );
  }
}
