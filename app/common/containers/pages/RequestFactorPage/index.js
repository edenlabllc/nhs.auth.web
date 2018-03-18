import React from "react";
import { connect } from "react-redux";

import { Main, Header, Article } from "../../../components/CenterLayout";
import { H1 } from "../../../components/Title";
import FactorForm from "../../forms/FactorForm";

import { onSubmit } from "./redux";

@connect(null, { onSubmit })
export default class RequestFactorPage extends React.Component {
  render() {
    const { onSubmit = () => {} } = this.props;

    return (
      <Main id="change-otp-page">
        <Header>
          <H1>Вхід у систему eHealth</H1>
        </Header>
        <Article>
          <FactorForm
            onSubmit={({ phone }) => onSubmit(phone.replace(/\s/g, ""))}
          />
        </Article>
      </Main>
    );
  }
}
