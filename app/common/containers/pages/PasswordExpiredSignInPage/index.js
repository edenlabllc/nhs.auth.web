import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { H1 } from 'components/Title';
import Button, { ButtonsGroup } from 'components/Button';
import { Main, Header, Article } from 'components/CenterLayout';

import SignInForm from 'containers/forms/SignInForm';

import { onSubmit } from './redux';

@withRouter
@connect(null, { onSubmit })
export default class PasswordExpiredSignInPage extends React.Component {
  render() {
    const { onSubmit = () => {}, router } = this.props;

    return (
      <Main id="sign-in-page">
        <Header>
          <H1>Вхід у систему eHealth</H1>
        </Header>
        <Article>
          <SignInForm onSubmit={onSubmit} />
          <ButtonsGroup>
            <Button theme="link" onClick={() => router.goBack()}>
              Назад
            </Button>
          </ButtonsGroup>
        </Article>
      </Main>
    );
  }
}
