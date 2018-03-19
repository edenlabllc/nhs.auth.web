import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, applyRouterMiddleware } from "react-router";
import { useRedial } from "react-router-redial";

import { showLoading, hideLoading } from "../common/redux/loading";

export default class RootComponent extends Component {
  constructor(props) {
    super(props);
    // History and routes in Router can't be replaced
    this.routes = props.routes;
    this.history = props.history;

    // Store in Provider can't be replaced
    this.store = props.store;
  }

  render() {
    const { renderProps, locals } = this.props;

    const { history, routes, store } = this;

    return (
      <Provider store={store}>
        <Router
          {...renderProps}
          history={history}
          routes={routes}
          render={applyRouterMiddleware(
            useRedial({
              locals,
              beforeTransition: ["fetch"],
              afterTransition: ["defer", "done"],
              parallel: true,
              initialLoading:
                process.env.NODE_ENV === "production"
                  ? null
                  : () => <div>Loading...</div>,
              onStarted: () => {
                store.dispatch(showLoading());
              },
              onCompleted: transition => {
                store.dispatch([hideLoading()]);
                if (transition === "beforeTransition") {
                  window.scrollTo(0, 0);
                }
              },
              onAborted: () => {
                store.dispatch(hideLoading());
              },
              onError: () => {
                store.dispatch(hideLoading());
              }
            })
          )}
        />
      </Provider>
    );
  }
}
