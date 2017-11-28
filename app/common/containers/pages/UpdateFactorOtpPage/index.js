import React from 'react';
import { connect } from 'react-redux';

import { Main, Header, Article } from 'components/CenterLayout';
import { H2 } from 'components/Title';
import OtpForm from 'containers/forms/OtpForm';

import { onSubmit, onResend } from './redux';

@connect(null, { onSubmit, onResend })
export default class UpdateFactorOtpPage extends React.Component {
  render() {
    const { onSubmit = () => {}, onResend = () => {} } = this.props;

    return (
      <Main id="new-factor-approve-page">
        <Header>
          <H2>Введіть код, який було відправлено на Ваш існуючий телефон</H2>
        </Header>
        <Article>
          <OtpForm onSubmit={onSubmit} onResend={onResend} />
        </Article>
      </Main>
    );
  }
}
