import axios from "axios";
import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import MockAdapter from "axios-mock-adapter";
import CreateTeam from "../../client/components/createTeam/createTeam";
import rootSaga from "../../client/sagas/index";
import "babel-polyfill";

const { createBrowserHistory } = require("history");

const history = createBrowserHistory();

const mock = new MockAdapter(axios);

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureStore([sagaMiddleware]);
const initialStore = {
  user: {
    authenticated: false,
    loading: false,
    username: "",
    error: false
  },
  team: {
    loading: false,
    team: [],
    error: false
  }
};
const store = mockStore(initialStore);
sagaMiddleware.run(rootSaga);
describe("create team page works properly", () => {
  let wrapper;
  let submit;
  let team;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <CreateTeam />
        </Router>
      </Provider>
    );
    submit = wrapper.find("#submit").at(1);
    team = wrapper.find("#team").at(1);
  });
  it("mounts properly", () => {
    wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <CreateTeam />
        </Router>
      </Provider>
    );
  });
  it("does not create team when no teamname is written", () => {
    const spy = jest.spyOn(axios, "post");
    mock.onPost("/team/create", { team: "", open: false }).reply(200, {
      team: "",
      open: false
    });
    submit.simulate("click");
    expect(spy).not.toHaveBeenCalled();
  });
  it("creates team properly when teamname is present", done => {
    const spy = jest.spyOn(history, "push");
    mock
      .onPost("/team/create", { team: "fakeTeam", open: false })
      .reply(200, { team: "fakeTeam", open: false });
    team.simulate("change", { target: { value: "fakeTeam" } });
    submit.simulate("click");
    setImmediate(() => {
      const expectedAction = {
        type: "TEAM_CREATE",
        payload: {
          team: "fakeTeam",
          open: false
        }
      };
      expect(store.getActions()[2]).toEqual(expectedAction);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
