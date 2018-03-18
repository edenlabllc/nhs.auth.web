import React from "react";
import { connect } from "react-redux";

import { H1 } from "components/Title";
import FactorForm from "containers/forms/FactorForm";
import { Main, Header, Article } from "components/CenterLayout";

import { onSubmit } from "./redux";

@connect(null, { onSubmit })
export default class UpdateFactorPhonePage extends React.Component {
  render() {
    const { onSubmit = () => {} } = this.props;

    return (
      <Main id="new-factor-page">
        <Header>
          <H1>Введіть Ваш новий номер телефону</H1>
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
