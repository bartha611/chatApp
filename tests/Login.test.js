import Login from '../client/src/Login/login.jsx'
import { shallow, mount} from 'enzyme';
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


describe('handleChange is operating properly', () => {
  let wrapper;

  //check if username 
  it('username checks', () => {
    wrapper = shallow(<Login />);
    const container = wrapper.find('#username');
    container.simulate('change', {target: {name: 'username', value: 'adambarth611'}});
    expect(wrapper.state('username')).toEqual('adambarth611');
  });
  
  //check if password exists
  it('password checks', () => {
    wrapper = shallow(<Login />);
    const container = wrapper.find('#password');
    container.simulate('change', {target: {name: 'password', value: 'hello'}});
    expect(wrapper.state('password')).toEqual('hello');
  })
});

describe('axios post works', () => {
  var instance;
  var mock
  beforeEach(() => {
    instance = axios.create();
    mock = new MockAdapter(instance);
  })
  let wrapper;
  it('axios post works', () => {
    instance = axios.create();
    mock = new MockAdapter(instance);
    mock.onPost('/user/login').reply(404);
    // return instance.post('/user/login', {params: {username: 'alsjflasjfsa', password: 'alkjdsfkasjdfkjds'}})
    // .then(response => {
    //   console.log(response)
    //   expect(1+1).toEqual(2)
    // })
    axios.post('/user/login', {username: 'alkdsjflksajfa', password: 'alskjdf;lasjfsa'})
    .then(function(response) {
      console.log(response);
    })
  })
  // it('handleSubmit fires', () => {
  //   wrapper = shallow(<Login />);
  //   wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'adambarth611'}});
  //   wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'hello'}});
  //   const spy = jest.spyOn(wrapper.instance(), "handleSubmit");
  //   wrapper.update();
  //   wrapper.instance().forceUpdate();
  //   wrapper.find('#submit').simulate('click', {preventDefault: () => {}});
  //   expect(spy).toHaveBeenCalledTimes(1);
  // })
})

