import React from "react";

import { reduxForm, Field } from "redux-form";

import FieldCheckbox from "components/reduxForm/FieldCheckbox";
import Button from "components/Button";

import { reduxFormValidate } from "react-nebo15-validate";

import styles from "./styles.css";

@reduxForm({
  form: "invite-accept-form",
  validate: reduxFormValidate({
    confirm: {
      required: true
    }
  })
})
export default class InviteAcceptForm extends React.Component {
  render() {
    const { handleSubmit, onSubmit = () => {}, submitting } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            labelText="Погоджуюсь з Регламентом функціонування системи eHealth"
            type="checkbox"
            name="confirm"
            component={FieldCheckbox}
          />
        </div>
        <div>
          <Button disabled={submitting} type="submit" color="blue">
            прийняти запрошення
          </Button>
        </div>
      </form>
    );
  }
}
