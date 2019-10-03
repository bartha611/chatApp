import { mount } from "enzyme";
import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import Login from "../client/components/Login/login";
import "babel-polyfill";

import fetchData from '../client/middleware'

const mock = new MockAdapter(axios);

// mock redux store for testing
const middleWare = [fetchData];
const mockStore = configureStore(middleWare);
const initialState = {
  isLoading: false,
  user: "",
  error: null
};
const store = mockStore(initialState);

// mock axios for testing

describe("handleChange is operating properly", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });
  it("container mounts", () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });
  it("enter calls handleSubmit properly", done => {
    const container = wrapper.find("#submit").at(1);
    const userInput = wrapper.find("#username").at(1);
    const passwordInput = wrapper.find("#password").at(1);
    mock.onPost("http://localhost:3000/user/login").reply(200);
    userInput.simulate("change", { target: { value: "fakeUser" } });
    passwordInput.simulate("change", { target: { value: "fakePassword" } });
    container.simulate("keydown", { key: "enter", keyCode: 13, which: 13 });
    setImmediate(() => {
      const expectActions = [
        {
          type: "USER",
          verb: "POST",
          endpoint: "/user/login",
          operation: "LOGIN",
          payload: { password: "fakePassword", username: "fakeUser" }
        }
      ];
      console.log(store.getState())
      expect(store.getActions()).toEqual(expectActions);
      done();
    });
  });
});
