import Login from '../client/src/Login/login.jsx'
import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


describe('handleChange is operating properly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />)
  })

  //check if username 
  it('username checks', () => {
    const container = wrapper.find('#username');
    container.simulate('change', {target: {name: 'username', value: 'adambarth611'}});
    expect(wrapper.state('username')).toEqual('adambarth611');
  });
  
  //check if password exists
  it('password checks', () => {
    const container = wrapper.find('#password');
    container.simulate('change', {target: {name: 'password', value: 'hello'}});
    expect(wrapper.state('password')).toEqual('hello');
  })
});

describe('axios post works', () => {
  var instance;
  var mock;
  var wrapper;
  beforeEach(function() {
    instance = axios.create();
    mock = new MockAdapter(instance);
    wrapper = shallow(<Login />)
  })
  it('correctly sets adapter', () => {
    expect(instance.defaults.adapter).toBeDefined();
  })
  it('axios post works', () => {
    mock.onPost('http:localhost:3000/user/login').reply(200);
    return instance.post('http:localhost:3000/user/login', {username: 'eric', password: 'a'})
    .then(response => {
      expect(response.status).toEqual(200);
    })
  })
  it('handleSubmit fires', () => {
    wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'adambarth611'}});
    wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'hello'}});
    const spy = jest.spyOn(wrapper.instance(), "handleSubmit");
    wrapper.update();
    wrapper.instance().forceUpdate();
    wrapper.find('#submit').simulate('click', {preventDefault: () => {}});
    expect(spy).toHaveBeenCalledTimes(1);
  })
})

