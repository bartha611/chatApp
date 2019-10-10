import { mount } from 'enzyme';
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Signup from '../client/components/SignUp/signup';

import "babel-polyfill"

import fetchData from '../client/middleware';

const mock = new MockAdapter(axios);

const middleWare = [fetchData];
const mockStore = configureStore(middleWare);
const state = {
  user: {
    userLoading: false,
    username: "",
    authenticated: false,
    team: [],
    userError: null
  }
};
const store = mockStore(() => state);

describe('User can signup properly', () => {
  let wrapper; 
  let usernameInput;
  let emailInput; 
  let passwordInput;
  let confirmInput;
  let submitButton;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    )
    usernameInput = wrapper.find('#username').at(1);
    emailInput = wrapper.find('#email').at(1);
    passwordInput = wrapper.find('#password').at(1)
    confirmInput = wrapper.find('#confirm').at(1);
    submitButton = wrapper.find('#submit').at(1);
  })
  it('signup mounts properly', () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    )
  })
  it("fails when confirm isn't equivalent to password", done => {
    usernameInput.simulate('change', { target: { value: 'fakeUser'}});
    emailInput.simulate('change', { target: { value: 'fake@email.com'}});
    passwordInput.simulate('change', { target: { value: 'fakePassword'}});
    confirmInput.simulate('change', { target: { value: 'fakepassword'}});
    mock.onPost('/user/register').reply(200)
    submitButton.simulate('click');
    setImmediate(() => {
      const expectedActions = [];
      expect(store.getActions()).toEqual(expectedActions);
      done();
    })
  })
  it('Signup works properly', done => {
    mock.onPost('/user/register').reply(200, "fakeUser");
    usernameInput.simulate('change', { target: { value: "fake"}});
    emailInput.simulate('change', { target: { value: 'fakeUser@gmail.com'}});
    passwordInput.simulate('change', { target: { value: 'fakePassword'}})
    confirmInput.simulate('change', { target: { value: "fakePassword"}})
    submitButton.simulate('click');
    setImmediate(() => {
      const expectedActions = [
        {
          type: 'USER_REQUEST'
        },
        {
          type: 'CREATE_USER_RECEIVED',
          payload: 'fakeUser'
        }
      ]
      expect(store.getActions()).toEqual(expectedActions);
      done();
    })
  })
})
