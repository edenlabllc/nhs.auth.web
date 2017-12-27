import React from 'react';

import { Route, IndexRedirect, IndexRoute } from 'react-router';

import App from 'containers/layouts/App';
import Main from 'containers/layouts/Main';
import Default from 'containers/layouts/Default';
import FAQ from 'containers/layouts/FAQ';
import InviteLayout from 'containers/layouts/InviteLayout';

import InvitePage from 'containers/pages/InvitePage';
import InviteAcceptPage from 'containers/pages/InviteAcceptPage';
import InviteSuccessPage from 'containers/pages/InviteSuccessPage';
import InviteRejectPage from 'containers/pages/InviteRejectPage';
import SignInPage from 'containers/pages/SignInPage';
import OtpPage from 'containers/pages/OtpPage';
import AcceptPage from 'containers/pages/AcceptPage';
import ConditionPage from 'containers/pages/ConditionPage';

import RequestFactorPage from 'containers/pages/RequestFactorPage';
import RequestFactorApprovePage from 'containers/pages/RequestFactorApprovePage';

import ResetPasswordPage from 'containers/pages/ResetPasswordPage';
import NewPasswordPage from 'containers/pages/NewPasswordPage';

import UpdateFactorSignInPage from 'containers/pages/UpdateFactorSignInPage';
import UpdateFactorOtpPage from 'containers/pages/UpdateFactorOtpPage';
import UpdateFactorPhonePage from 'containers/pages/UpdateFactorPhonePage';
import UpdateFactorPhoneOtpPage from 'containers/pages/UpdateFactorPhoneOtpPage';
import UpdateFactorSuccessPage from 'containers/pages/UpdateFactorSuccessPage';

import PasswordExpiredSignInPage from 'containers/pages/PasswordExpiredSignInPage';
import PasswordExpiredPage from 'containers/pages/PasswordExpiredPage';
import UpdatePasswordSuccessPage from 'containers/pages/UpdatePasswordSuccessPage';

import NotFoundPage from 'containers/pages/NotFoundPage';

import { getUser, getToken } from 'reducers';

import { isLoginned, logout } from 'redux/session';
import { fetchUserData } from 'redux/user';

export const configureRoutes = ({ store }) => { // eslint-disable-line
  const requireAuth = (nextState, replace, next) =>
    store.dispatch(isLoginned()).then((loginned) => {
      if (!loginned) {
        replace({ pathname: '/' });
        return next();
      }

      const currentState = store.getState();
      const person = getUser(currentState);

      if (person) return next();

      return store.dispatch(fetchUserData(getToken(currentState))).then((action) => {
        if (action.error) {
          store.dispatch(logout());
          replace({ pathname: '/' });
        }

        return next();
      });
    });

  return (
    <Route component={App}>
      <Route component={Main}>
        <Route path="/">
          <Route component={FAQ}>
            <Route path="conditions" component={ConditionPage} />
          </Route>
          <Route component={Default}>
            <Route path="invite" component={InviteLayout}>
              <IndexRoute
                inviteStatuses={['NEW']}
                component={InvitePage}
              />
              <Route
                path="accept"
                inviteStatuses={['NEW']}
                component={InviteAcceptPage}
              />
              <Route
                path="success"
                inviteStatuses={['APPROVED']}
                component={InviteSuccessPage}
              />
              <Route
                path="reject"
                inviteStatuses={['REJECTED']}
                component={InviteRejectPage}
              />
            </Route>
            <Route path="sign-in" component={SignInPage} />
            <Route path="update-password" component={PasswordExpiredSignInPage} />
            <Route path="update-password/new" component={PasswordExpiredPage} />
            <Route path="update-password/success" component={UpdatePasswordSuccessPage} />

            <Route path="update-factor" component={UpdateFactorSignInPage} />

            <Route path="reset" component={ResetPasswordPage} />
            <Route path="reset/:id" component={NewPasswordPage} />
            <Route onEnter={requireAuth}>
              <Route path="accept" component={AcceptPage} />
              <Route path="otp-send" component={OtpPage} />
              <Route path="request-factor" component={RequestFactorPage} />
              <Route path="request-factor/approve" component={RequestFactorApprovePage} />
              <Route path="update-factor/otp" component={UpdateFactorOtpPage} />
              <Route path="update-factor/phone" component={UpdateFactorPhonePage} />
              <Route path="update-factor/phone/otp" component={UpdateFactorPhoneOtpPage} />
              <Route path="update-factor/success" component={UpdateFactorSuccessPage} />
            </Route>

            <Route path="*" component={NotFoundPage} />
          </Route>

          <IndexRedirect to="sign-in" />
        </Route>
      </Route>
    </Route>
  );
};
