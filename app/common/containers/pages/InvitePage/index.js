import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'withStyles';
import { withRouter } from 'react-router';
import format from 'date-fns/format';

import Button from 'components/Button';
import { H1 } from 'components/Title';
import Points from 'components/Points';

import InviteSignInForm from 'containers/forms/InviteSignInForm';
import InviteSignUpForm from 'containers/forms/InviteSignUpForm';

import { getRequestById } from 'reducers';

import { onSubmitSignUp, onSubmitSignIn } from './redux';

import styles from './styles.scss';

const toArray = v => (!Array.isArray(v) ? [v] : v);

@withRouter
@withStyles(styles)
@connect((state, { location: { query } }) => ({
  request: getRequestById(state, query.invite),
}), { onSubmitSignUp, onSubmitSignIn })
export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.state = {
      showDetails: false,
    };
  }
  toggleDetails() {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  }
  renderDetails() {
    const { request: { doctor, party } } = this.props;
    const GENDER_NAMES = { MALE: 'чоловіча', FEMALE: 'жіноча' };
    const DOCUMENT_NAMES = { PASSPORT: 'Паспорт' };
    const PHONE_NAMES = { MOBILE: 'Мобільний' };

    return (
      <div className={styles.details__body}>
        <div className={styles.details__title}>Персональная інформація</div>
        <div className={styles.details__block}>
          <p>{party.first_name} {party.second_name} {party.last_name}</p>
          <p>{party.birth_date} рн</p>
          <p><b>Стать:</b> {GENDER_NAMES[party.gender] || '-'}</p>
          <p><b>ІНН:</b> {party.tax_id}</p>
          <p><b>Email:</b> {party.email}</p>
        </div>
        <div className={styles.details__title}>Документи</div>
        {(party.documents && party.documents) ?
          party.documents.map((doc, idx) => (
            <div className={styles.details__block} key={idx}>
              <p><b>Тип документу:</b> {DOCUMENT_NAMES[doc.type] || '-'}</p>
              <p><b>Номер:</b> {doc.number}</p>
            </div>
          )) : '-'
        }
        <div className={styles.details__title}>Контактні номери телефону</div>
        {(party.phones && party.phones) ?
          party.phones.map((phone, idx) => (
            <div className={styles.details__block} key={idx}>
              <p><b>Тип телефону:</b> {PHONE_NAMES[phone.type] || '-'}</p>
              <p><b>Номер:</b> {phone.number}</p>
            </div>
          )) : '-'
        }
        <div className={styles.details__title}>Освіта</div>
        {(doctor.educations && doctor.educations.length) ?
          doctor.educations.map((education, idx) => (
            <div className={styles.details__block} key={idx}>
              <p>{education.institution_name}, {education.city} {education.country}</p>
              <p><b>Диплом:</b> {education.diploma_number} від {education.issued_date}</p>
              <p><b>Спеціальність:</b> {education.speciality}</p>
            </div>
          )) : '-'
        }
        <div className={styles.details__title}>Наукові ступіні</div>
        {(doctor.science_degree && toArray(doctor.science_degree).length) ?
          toArray(doctor.science_degree).map((degree, idx) => (
            <div className={styles.details__block} key={idx}>
              <p>{degree.degree}, {degree.city} {degree.country}</p>
              <p><b>Спеціальність:</b> {degree.speciality}</p>
              <p>{degree.institution_name}, {degree.city} {degree.country}</p>
              <p><b>Диплом:</b> {degree.diploma_number} від {degree.issued_date}</p>
            </div>
          )) : '-'
        }
        <div className={styles.details__title}>Кваліфікації</div>
        {(doctor.qualifications && doctor.qualifications.length) ?
          doctor.qualifications.map((qualification, idx) => (
            <div className={styles.details__block} key={idx}>
              <p>{qualification.type} в {qualification.institution_name}</p>
              <p><b>Сертифікат:</b>{' '}
                {qualification.certificate_number} від {qualification.issued_date}
              </p>
              <p><b>Спеціальність:</b> {qualification.speciality}</p>
            </div>
          )) : '-'
        }
        <div className={styles.details__title}>Спеціальності</div>
        {(doctor.specialities && doctor.specialities.length) ?
          doctor.specialities.map((speciality, idx) => (
            <div className={styles.details__block} key={idx}>
              <p>{speciality.speciality} {speciality.level}</p>
              <p><b>Сертифікат:</b> {speciality.certificate_number}</p>
              <p><b>Виданий:</b> {speciality.attestation_name} {speciality.attestation_date}</p>
              <p><b>Тип кваліфікації:</b> {speciality.qualification_type}</p>
              <p><b>Спеціальність:</b> {speciality.speciality}</p>
              <p><b>Спеціальність за посадою:</b> {speciality.speciality_officio ? 'Так' : 'Ні'}</p>
              <p><b>Дійсний до:</b> {speciality.valid_to_date}</p>
            </div>
          )) : '-'
        }
      </div>
    );
  }
  render() {
    const {
      request: { party = {}, legal_entity = {}, position, user_id } = {},
      location,
    } = this.props;

    return (
      <section className={styles.main} id="sign-up-page">
        {
          !user_id && <header className={styles.header}>
            <H1>Реєстрація</H1>

            <Points count={2} active={0} />
          </header>
        }
        <article className={styles.content}>
          <div className={styles.description}>
            Я, {party.first_name} {party.second_name} {party.last_name}, {format(party.birth_date, 'DD/MM/YYYY')} р.н.
          </div>

          <div className={styles.accept}>
            даю згоду на обробку моїх даних та <br />
            реєстрацію мене як {position} <br />
            {legal_entity.name}
          </div>
        </article>
        <div className={styles.details}>
          <div className={styles.details__header}>
            <Button onClick={this.toggleDetails} theme="link" inheritFontSize>
              {this.state.showDetails ? 'Сховати деталі' : 'Детальніше'}
            </Button>
          </div>
          { this.state.showDetails && this.renderDetails() }
        </div>

        <div className={styles.form}>
          {user_id && <InviteSignInForm
            email={party.email}
            onSubmit={({ password }) => this.props.onSubmitSignIn(
              party.email,
              password,
              location.query.invite,
            )}
          />}

          {!user_id && <InviteSignUpForm
            email={party.email}
            onSubmit={({ password }) => this.props.onSubmitSignUp(
              party.email,
              password,
            )}
          />}
        </div>
      </section>
    );
  }
}
