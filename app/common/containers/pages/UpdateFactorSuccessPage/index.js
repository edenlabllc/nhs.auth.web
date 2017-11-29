import React from 'react';
import { withRouter } from 'react-router';

import { H2 } from 'components/Title';
import Button from 'components/Button';
import { Main, Header, Article } from 'components/CenterLayout';

@withRouter
export default class UpdateFactorSuccessPage extends React.Component {
  render() {
    const { location: { query } } = this.props;
    const invite = query && query.invite ? `invite=${query.invite}` : false;
    return (
      <Main id="update-factor-success-page">
        <Header>
          <H2>Фактор було успішно змінено!</H2>
        </Header>
        <Article>
          {
            query ? <Button color="blue" to={`/invite?${invite}`}>
                Повернутися до запрошення
            </Button> : <Button color="blue" to="/sign-in">
              Повернутися до входу
            </Button>
          }
        </Article>
      </Main>
    );
  }
}
