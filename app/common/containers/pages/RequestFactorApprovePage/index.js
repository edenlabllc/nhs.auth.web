import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { H1, H2 } from "components/Title";
import OtpForm from "containers/forms/OtpForm";
import { Main, Header, Article } from "components/CenterLayout";
import Button from "components/Button";

import { onSubmit } from "./redux";

@withRouter
@connect(null, { onSubmit })
export default class RequestFactorOtpPage extends React.Component {
  render() {
    const { onSubmit = () => {}, location } = this.props;
    const invite =
      location.query && location.query.invite
        ? `invite=${location.query.invite}`
        : false;
    return (
      <Main id="factor-approve-page">
        <Header>
          <H1>Введення коду</H1>
          <br />
          <br />
          <H2 textTransform="initial">Введіть код, що прийшов на телефон</H2>
        </Header>
        <Article>
          <OtpForm onSubmit={onSubmit} />
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
