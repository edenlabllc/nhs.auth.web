import React from 'react';
import withStyles from 'withStyles';
import { reduxForm, Field } from 'redux-form';

import FieldCheckbox from 'components/reduxForm/FieldCheckbox';
import FieldInput from 'components/reduxForm/FieldInput';
import Button from 'components/Button';
import { H1 } from 'components/Title';

import { reduxFormValidate } from 'react-nebo15-validate';

import styles from './styles.scss';

@withStyles(styles)
@reduxForm({
  form: 'invite-sign-in-form',
  validate: reduxFormValidate({
    password: {
      required: true,
    },
    confirm: {
      required: true,
    },
  }),
})
export default class InviteSignInForm extends React.Component {
  render() {
    const { handleSubmit, submitting, email } = this.props;

    return (
      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <H1>ВХІД з E-heath</H1>
        </div>
        <div>
          {email}
        </div>
        <div className={styles.input}>
          <Field
            type="password"
            placeholder="Пароль"
            name="password"
            component={FieldInput}
          />
        </div>
        <div>
          <Field labelText="Даю згоду на обробку моїх персональних даних та доступ до мого облікового запису в E-health" type="checkobox" name="confirm" component={FieldCheckbox} />
        </div>
        <div>
          <Button disabled={submitting} type="submit" color="blue">
            далі
          </Button>
        </div>
      </form>
    );
  }
}
