import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { shallow } from "enzyme";
import React from "react";
import Signup from './../client/src/SignUp/signup.jsx'

describe("handleChange working properly for all input fields", () => {
  let wrapper;
  let container;
  beforeEach(() => {
    wrapper = shallow(<Signup />)
  });
  it("username changes", () => {
    container = wrapper.find('#username');
    container.simulate('change', {target: {name: 'username', value: 'adam'}});
    expect(wrapper.state('username')).toEqual('adam');
  });
  it('password changes', () => {
    container = wrapper.find('#password');
    container.simulate('change', {target: {name: 'password', value: 'blah'}});
    expect(wrapper.state('password')).toEqual('blah');
  });
  it('email changes', () => {
    container = wrapper.find('#email');
    container.simulate('change', {target: {name: 'email', value: 'adam@gmail.com'}});
    expect(wrapper.state('email')).toEqual('adam@gmail.com');
  });
  it('confirm password changes', () => {
    container = wrapper.find('#confirm');
    container.simulate('change', {target: {name: 'confirmPassword', value: 'blah1'}});
    expect(wrapper.state('confirmPassword')).toEqual('blah1');
  })
});

describe('handleSubmit and axios working properly', () => {
  let wrapper;
  let mock;
  let instance;
  let spy;
  beforeEach(() => {
    instance = axios.create();
    mock = new MockAdapter(instance);
    wrapper = shallow(<Signup />)
  });
  it('handleSubmit working', () => {
    wrapper.simulate('change', {target: {name: 'username', value: 'adam'}});
    wrapper.simulate('change', {target: {name:'email', value: 'adam@gmail.com'}});
    wrapper.simulate('change', {target: {name: 'password', value: 'hello'}});
    wrapper.simulate('change', {target: {name: 'confirmPassword', value: 'hello'}});
    spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.update();
    wrapper.instance().forceUpdate();
    wrapper.find('#submit').simulate('click', {preventDefault: () => {}});
    expect(spy).toHaveBeenCalled();
  });
  it('axios post works', () => {
    mock.onPost('http://localhost:3000/user/register').reply(200);
    return instance.post('http://localhost:3000/user/register', {username: 'adam', passowrd: 'blah', email: 'adam@gmail.com'})
    .then(response => {
      expect(response.status).toEqual(200)
    })
  })
})

