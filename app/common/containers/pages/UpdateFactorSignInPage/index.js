import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { H1 } from "components/Title";
import Button, { ButtonsGroup } from "components/Button";
import { Main, Header, Article } from "components/CenterLayout";

import SignInForm from "containers/forms/SignInForm";

import { onSubmit } from "./redux";

@withRouter
@connect(null, { onSubmit })
export default class UpdateFactorSignInPage extends React.Component {
  render() {
    const { onSubmit = () => {}, location, router } = this.props;
    const invite =
      location.query && location.query.invite
        ? `invite=${location.query.invite}`
        : false;

    return (
      <Main id="update-factor-page">
        <Header>
          <H1>Зміна фактора авторизації</H1>
        </Header>
        <Article>
          <SignInForm
            onSubmit={onSubmit}
            initialValues={{
              email: location.query.email
            }}
          />
          <ButtonsGroup>
            <Button
              theme="link"
              onClick={() => {
                if (invite) return router.goBack();
                return router.push("/sign-in");
              }}
            >
              Назад
            </Button>
          </ButtonsGroup>
        </Article>
      </Main>
    );
  }
}
