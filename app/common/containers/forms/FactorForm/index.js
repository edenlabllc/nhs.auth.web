import React from "react";

import { withRouter } from "react-router";
import { reduxForm, Field } from "redux-form";
import { FormBlock } from "../../../components/Form";
import Button, { ButtonsGroup } from "../../../components/Button";
import FieldInput from "../../../components/reduxForm/FieldInput";
import normalizePhone from "../../../helpers/phone";

import { reduxFormValidate, ErrorMessage } from "react-nebo15-validate";

import styles from "./styles.css";

@withRouter
@reduxForm({
  form: "factor-form",
  validate: reduxFormValidate({
    phone: {
      required: true,
      phone_number: () => /^\d{2} \d{3} \d{2} \d{2}$/
    }
  })
})
export default class FactorForm extends React.Component {
  render() {
    const {
      submitting,
      handleSubmit,
      router,
      btnColor = "blue",
      noLabel
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormBlock>
          <div>
            <Field
              labelText={
                noLabel &&
                "Введіть номер телефона, що буде використано для авторизації"
              }
              type="tel"
              name="phone"
              prefix="+380"
              component={FieldInput}
              normalize={normalizePhone}
            >
              <ErrorMessage when="access_denied">
                Термін доступу користувача вичерпано. Радимо повернутися до
                попереднього кроку.
              </ErrorMessage>
              <ErrorMessage when="token_invalid_type">
                Термін cecії користувача вичерпано. Радимо повернутися до
                попереднього кроку
              </ErrorMessage>
            </Field>
          </div>
          <ButtonsGroup>
            <Button disabled={submitting} type="submit" color={btnColor}>
              Ввести
            </Button>
            <Button
              disabled={submitting}
              theme="link"
              onClick={() => router.goBack()}
            >
              Назад
            </Button>
          </ButtonsGroup>
        </FormBlock>
      </form>
    );
  }
}
