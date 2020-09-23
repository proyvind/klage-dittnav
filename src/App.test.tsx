import React from "react";
import renderer from "react-test-renderer";
import App from "./App";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("Welcome klage", () => {
  const store = configureStore();

  it("Renders correctly when there is no data", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
