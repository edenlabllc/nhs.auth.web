import React from 'react';

import { H2 } from 'components/Title';
import Button from 'components/Button';
import { Main, Header, Article } from 'components/CenterLayout';

export default class UpdateFactorSuccessPage extends React.Component {
  render() {
    return (
      <Main id="update-factor-success-page">
        <Header>
          <H2>Фактор було успішно змінено!</H2>
        </Header>
        <Article>
          <Button color="blue" to="/sign-in">
            Повернутися до входу
          </Button>
        </Article>
      </Main>
    );
  }
}
