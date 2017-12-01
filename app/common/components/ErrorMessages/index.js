import React from 'react';
import { translate } from 'react-i18next';
import { ErrorMessages, ErrorMessage } from 'react-nebo15-validate';

@translate()
export default class ErrorMessagesTranslated extends React.Component {
  render() {
    const { children, t, ...rest } = this.props;
    return (
      <ErrorMessages {...rest}>
        {children}
        <ErrorMessage when="required">{t('Required field')}</ErrorMessage>
        <ErrorMessage when="email">{t('Invalid email format')}</ErrorMessage>
        <ErrorMessage when="userName">{t('Invalid surname')}</ErrorMessage>
        <ErrorMessage when="phone_number">Не вірний формат номеру телефону</ErrorMessage>

        <ErrorMessage when="maxLength">{t('Length must be less than <%= params %>')}</ErrorMessage>
        <ErrorMessage when="minLength">{t('Length must be more than <%= params %>')}</ErrorMessage>
        <ErrorMessage when="card_number">{ t('Invalid card number') }</ErrorMessage>
        <ErrorMessage when="uniqueCardName">{t('Card with such name already exists')}</ErrorMessage>
        <ErrorMessage when="uniqueCardNumber">{t('Card with such number already exists')}</ErrorMessage>
        <ErrorMessage when="cardType">
          {t('Support only {{types}} cards', { types: this.props.error.cardType && this.props.error.cardType.join(', ') })}
        </ErrorMessage>
        <ErrorMessage when="min">{t('Minimal value is <%= params %>')}</ErrorMessage>
        <ErrorMessage when="max">{t('Maximum value is <%= params %>')}</ErrorMessage>

        <ErrorMessage when="passwordMismatch">Не вірно введено пароль</ErrorMessage>
        <ErrorMessage when="identityMismatch">Такого користувача не існує</ErrorMessage>

        <ErrorMessage when="accountPasswordMismatch">{t('Account or password combination mismatch')}</ErrorMessage>
        <ErrorMessage when="emailOrPasswordMismatch">{t('Account, password combination is mismatch')}</ErrorMessage>

        <ErrorMessage when="user_blocked">Користувача заблоковано. Зверніться в службу підтримки</ErrorMessage>
        <ErrorMessage when="otp_reached_max_attempts">Ви використали всі спроби. Вас заблоковано!</ErrorMessage>
        <ErrorMessage when="otp_reached_max_attempts">Ви використали всі спроби. Вас заблоковано!</ErrorMessage>

        <ErrorMessage when="otp_invalid">Не вірно введено код підтверження</ErrorMessage>
        <ErrorMessage when="resentOtp">Не вдалося відправити код. Повторіть спробу через декілька хвилин</ErrorMessage>
        <ErrorMessage when="internal_error">Не вдалося відправити код. Повторіть спробу через декілька хвилин</ErrorMessage>

        <ErrorMessage when="otp_expired">Термін дії коду вичерпано. Спробуйте відправити знову</ErrorMessage>
        <ErrorMessage when="token_invalid">
          Термін cecії  користувача вичерпано. Радимо повернутися до попереднього кроку
        </ErrorMessage>
        <ErrorMessage when="token_expired">
          Термін cecії користувача вичерпано. Радимо повернутися до попереднього кроку
        </ErrorMessage>
        <ErrorMessage when="token_invalid_type">
          Термін cecії користувача вичерпано. Радимо повернутися до попереднього кроку
        </ErrorMessage>
        <ErrorMessage when="access_denied">
          Термін cecії користувача вичерпано. Радимо повернутися до попереднього кроку
        </ErrorMessage>
        <ErrorMessage when="notAllowed">
          Можливість зміни фактору Вам не доступна
        </ErrorMessage>
      </ErrorMessages>
    );
  }
}
