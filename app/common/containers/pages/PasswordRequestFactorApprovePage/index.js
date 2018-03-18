import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { H1, H2 } from "../../../components/Title";
import OtpForm from "../../forms/OtpForm";
import { Main, Header, Article } from "../../../components/CenterLayout";
import Button from "../../../components/Button";
import BackgroundLayout from "../../../components/BackgroundLayout";

import { onSubmit } from "./redux";

@withRouter
@connect(null, { onSubmit })
export default class PasswordRequestFactorApprovePage extends React.Component {
  render() {
    const { onSubmit = () => {}, location } = this.props;
    const invite =
      location.query && location.query.invite
        ? `invite=${location.query.invite}`
        : false;
    return (
      <Main id="password-factor-approve-page">
        <Header>
          <BackgroundLayout />
          <H1>Підтвердження фактору</H1>
          <br />
          <br />
          <H2 textTransform="initial" color="red">
            Введіть, код який було надіслано в СМС
          </H2>
        </Header>
        <Article>
          <OtpForm onSubmit={onSubmit} btnColor="green" />
          {invite ? (
            <Button theme="link" to={`/invite?${invite}`}>
              Повернутися до запрошення
            </Button>
          ) : (
            <Button theme="link" to={`/sign-in/${location.search}`}>
              Повернутися до входу
            </Button>
          )}
        </Article>
      </Main>
    );
  }
}
