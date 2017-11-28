import React from 'react';
import { connect } from 'react-redux';

import { H1 } from 'components/Title';
import OtpForm from 'containers/forms/OtpForm';
import { Main, Header, Article } from 'components/CenterLayout';

import { onSubmit } from './redux';


@connect(null, { onSubmit })
export default class RequestFactorOtpPage extends React.Component {
  render() {
    const { onSubmit = () => {} } = this.props;

    return (
      <Main id="factor-approve-page">
        <Header>
          <H1>Вхід у систему eHealth</H1>
        </Header>
        <Article>
          <OtpForm onSubmit={onSubmit} />
        </Article>
      </Main>
    );
  }
}
