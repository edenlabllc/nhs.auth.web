import React from 'react';
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import FieldInput from 'components/reduxForm/FieldInput';
import Button, { ButtonsGroup } from 'components/Button';

import { reduxFormValidate, ErrorMessage } from 'react-nebo15-validate';
import { FormBlock } from 'components/Form';

@withRouter
@reduxForm({
  form: 'otp-form',
  validate: reduxFormValidate({
    code: {
      required: true,
      format: /^\d*$/,
    },
  }),
})
export default class OtpForm extends React.Component {

  state = {
    send: false,
    isSending: false,
  };

  onClickResend() {
    if (!this.props.onResend) return null;
    const res = this.props.onResend();
    if (!res || typeof res.then !== 'function') return res;

    this.setState({ sent: false, isSending: true });
    setTimeout(() => {
      res.then(() => {
        this.setState({ isSending: false, sent: true });
        setTimeout(() => this.setState({ sent: false }), 5000);
      }, () => {
        this.setState({ isSending: false });
      });
    }, 1000);
    return res;
  }
  render() {
    const {
      handleSubmit,
      submitting,
      repeat = false,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FormBlock>
          <div>
            <Field
              placeholder="Введіть код, що прийшов на телефон"
              name="code"
              component={FieldInput}
            >
              <ErrorMessage when="format">Значення повинном бути числом</ErrorMessage>
            </Field>
          </div>
          <ButtonsGroup>
            <Button disabled={submitting} type="submit" color="blue">
              Ввести
            </Button>
            {
              repeat && (
                <Button
                  theme="link"
                  onClick={() => this.onClickResend()}
                  disabled={this.state.sent || this.state.isSending}
                >
                  { this.state.sent && 'Відправлено'}
                  { this.state.isSending && 'Відправляємо...'}
                  { !this.state.sent && !this.state.isSending && 'Відправити знову'}
                </Button>
              )
            }
          </ButtonsGroup>
        </FormBlock>
      </form>
    );
  }
}
