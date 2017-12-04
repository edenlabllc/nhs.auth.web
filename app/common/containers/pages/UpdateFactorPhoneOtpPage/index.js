import React from 'react';
import { connect } from 'react-redux';
import { Main, Header, Article } from 'components/CenterLayout';

import { H2 } from 'components/Title';
import OtpForm from 'containers/forms/OtpForm';
import Button from 'components/Button';
import { onSubmit } from './redux';


@connect(null, { onSubmit })
export default class UpdateFactorOtpNewPage extends React.Component {
  render() {
    const { onSubmit = () => {} } = this.props;

    return (
      <Main id="new-factor-approve-page">
        <Header>
          <H2>Введіть код, що було надіслано на Ваш новий телефон</H2>
        </Header>
        <Article>
          <OtpForm onSubmit={onSubmit} />
          <Button theme="link" to="/update-factor">
            Повернутися на початок
          </Button>
        </Article>
      </Main>
    );
  }
}
