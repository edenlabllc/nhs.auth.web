import React from "react";

import { reduxForm, Field } from "redux-form";

import FieldInput from "components/reduxForm/FieldInput";

import Button, { ButtonsGroup } from "components/Button";
import { H1 } from "components/Title";

import { reduxFormValidate, ErrorMessage } from "react-nebo15-validate";

import styles from "./styles.css";

@reduxForm({
  form: "invite-sign-in-form",
  validate: reduxFormValidate({
    password: {
      required: true
    }
  })
})
export default class InviteSignInForm extends React.Component {
  render() {
    const { handleSubmit, submitting, email } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <H1>Вхід у систему eHealth</H1>
        </div>
        <div>{email}</div>
        <div className={styles.input}>
          <Field
            type="password"
            placeholder="Пароль"
            name="password"
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
        <div className={styles.btns}>
          <ButtonsGroup>
            <Button disabled={submitting} type="submit" color="blue">
              далі
            </Button>
          </ButtonsGroup>
        </div>
      </form>
    );
  }
}
