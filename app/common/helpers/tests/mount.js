import React from "react";

import { Provider } from "react-redux";
import createMemoryHistory from "history/lib/createMemoryHistory";
import { mount } from "enzyme";

import { configureStore } from "../../store";

export default (component, ...args) =>
  mount(
    <Provider store={configureStore({ history: createMemoryHistory() })}>
      {component}
    </Provider>,
    ...args
  );
