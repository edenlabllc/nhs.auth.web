import React from 'react';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import FieldInput from 'components/reduxForm/FieldInput';
import Button, { ButtonsGroup } from 'components/Button';

import { reduxFormValidate } from 'react-nebo15-validate';
import { FormBlock } from 'components/Form';

@withRouter
@reduxForm({
  form: 'otp-form',
  validate: reduxFormValidate({
    code: {
      required: true,
    },
  }),
})
export default class OtpForm extends React.Component {
  render() {
    const {
      handleSubmit,
      onResend = () => {},
      submitting,
      router,
      repeat = false,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormBlock>
          <div>
            <Field
              placeholder="Введіть код, що прийшов на телефон"
              name="code"
              type="number"
              component={FieldInput}
            />
          </div>
          <ButtonsGroup>
            <Button disabled={submitting} type="submit" color="blue">
              Ввести
            </Button>
            {
              repeat && (
                <Button disabled={submitting} theme="link" onClick={onResend}>
                  Відправити знову
                </Button>
              )
            }
            <Button disabled={submitting} theme="link" onClick={() => router.goBack()}>
              Назад
            </Button>
          </ButtonsGroup>
        </FormBlock>
      </form>
    );
  }
}
