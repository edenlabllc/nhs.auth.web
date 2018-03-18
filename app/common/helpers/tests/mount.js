import React from "react";

import { configureStore } from "store";
import { Provider } from "react-redux";
import createMemoryHistory from "history/lib/createMemoryHistory";
import { mount } from "enzyme";

export default (component, ...args) =>
  mount(
    <Provider store={configureStore({ history: createMemoryHistory() })}>
      {component}
    </Provider>,
    ...args
  );
