import React from "react";
import { reduxForm, Field } from "redux-form";

import FieldInput from "../../../components/reduxForm/FieldInput";
import Button from "../../../components/Button";
import { FormBlock } from "../../../components/Form";
import { reduxFormValidate, ErrorMessage } from "react-nebo15-validate";
import { password_validate } from "../../../helpers/validate";

@reduxForm({
  form: "new-password-form",
  validate: reduxFormValidate({
    password: {
      ...password_validate
    },
    confirm_password: {
      required: true,
      confirmation: "password"
    }
  })
})
export default class ExpiredPasswordForm extends React.Component {
  render() {
    const { handleSubmit, submitting, btnColor = "blue" } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormBlock>
          <div>
            <Field
              placeholder="Введіть новий пароль"
              name="password"
              type="password"
              component={FieldInput}
            >
              <ErrorMessage when="format">
                Пароль повинен містити великі, малі літери та цифри
              </ErrorMessage>
              <ErrorMessage when="length">
                Повинен складатися хоча б з 12 символів
              </ErrorMessage>
            </Field>
          </div>
          <div>
            <Field
              placeholder="Повторіть новий пароль"
              name="confirm_password"
              type="password"
              component={FieldInput}
            >
              <ErrorMessage when="confirmation">
                Паролі не співпадають
              </ErrorMessage>
            </Field>
          </div>
          <div>
            <Button disabled={submitting} type="submit" color={btnColor}>
              Зберегти новий пароль
            </Button>
          </div>
        </FormBlock>
      </form>
    );
  }
}
