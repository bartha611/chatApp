import { mount } from 'enzyme';
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Login from '../client/components/Login/login';
import 'babel-polyfill'

const mock = new MockAdapter(axios);

// mock redux store for testing
const middleWare = [thunk];
const mockStore = configureStore(middleWare);
const initialState = {
  isLoading: false,
  user: '',
  error: null
};
const store = mockStore(initialState);

// mock axios for testing



describe('handleChange is operating properly', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>)
  })
  it('container mounts', () => {
    mount(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>)
  })
  it('enter calls handleSubmit properly', (done) => {
    const container = wrapper.find('#submit').at(1);
    const userInput = wrapper.find("#username").at(1);
    const passwordInput = wrapper.find("#password").at(1);
    mock.onPost('http://localhost:3000/user/login').reply(200)
    userInput.simulate('change', {target: {value: 'eric'}});
    passwordInput.simulate('change', {target: {value: 'alskdfj'}})
    container.simulate('keydown', {key:'enter', keyCode: 13, which: 13});
    setImmediate(() => {
      const expectActions = [
        {type: 'FETCH_USER_BEGIN'},
        {type: 'FETCH_USER_SUCCESS'},
        {type: 'FETCH_CHANNEL_BEGIN'},
        {type: 'FETCH_CHANNEL_SUCCESS'}
      ]
      expect(store.getActions()).toEqual(expectActions)
      done()
    })
  })
})