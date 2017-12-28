import React from 'react';
import { withRouter } from 'react-router';

import { H2 } from 'components/Title';
import Button from 'components/Button';
import { Main, Header, Article } from 'components/CenterLayout';

@withRouter
export default class UpdatePasswordSuccessPage extends React.Component {
  render() {
    const { location:  { query : { password_update, invite = false, ...query } } } = this.props; //eslint-disable-line

    return (
      <Main id="update-factor-success-page">
        <Header>
          <H2>Пароль успішно змінено!</H2>
        </Header>
        <Article>
          {
            invite ? <Button color="blue" to={{ pathname: '/invite', query: { invite } }}>
                Повернутися до запрошення
            </Button> : <Button color="blue" to={{ pathname: '/sign-in', query }}>
              Повернутися до входу
            </Button>
          }
        </Article>
      </Main>
    );
  }
}
