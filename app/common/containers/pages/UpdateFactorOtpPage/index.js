import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Main, Header, Article } from "components/CenterLayout";
import { H2 } from "components/Title";
import Button, { ButtonsGroup } from "components/Button";
import OtpForm from "containers/forms/OtpForm";

import { onSubmit, onResend } from "./redux";

@withRouter
@connect(null, { onSubmit, onResend })
export default class UpdateFactorOtpPage extends React.Component {
  render() {
    const { onSubmit = () => {}, onResend = () => {}, router } = this.props;

    return (
      <Main id="new-factor-approve-page">
        <Header>
          <H2>Введіть код, який було відправлено на Ваш існуючий телефон</H2>
        </Header>
        <Article>
          <OtpForm onSubmit={onSubmit} onResend={onResend} repeat />
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
