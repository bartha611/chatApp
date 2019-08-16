import { mount } from 'enzyme';
import React from 'react';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Login from '../client/components/Login/login';
import 'babel-polyfill'

const middleWare = [thunk];
const mockStore = configureStore(middleWare);
const initialState = {
  isLoading: false,
  user: '',
  error: null
};
const store = mockStore(initialState);


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
  it('enter calls handleSubmit properly', () => {
    const spy = jest.spyOn(wrapper, 'handleSubmit');
    const container = wrapper.find('#submit').at(1);
    container.simulate('keydown', {key:'enter', keyCode: 13, which: 13});
    expect(spy).toHaveBeenCalled(1);
  })
  // it('username is setting properly', () => {
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <Login />
  //       </BrowserRouter>
  //     </Provider>
  //   )
  //   const userInput = wrapper.find('#username').at(1);
  //   const passwordInput = wrapper.find('#password');
  //   const button = wrapper.find('')
  //   passwordInput.simulate('change', {target: {value: 'hello'}})
  //   userInput.simulate('change', {target: {value: 'adambarth'}});
    
    
    
    // expect(container.prop('data-value')).toBe('adambarth');
    
  })

  // check if username 
//   it('username checks', () => {
//     const container = wrapper.find('#username');
//     container.simulate('change', {target: {name: 'username', value: 'adambarth611'}});
//     expect(wrapper.state('username')).toEqual('adambarth611');
//   });
  
//   // check if password exists
//   it('password checks', () => {
//     const container = wrapper.find('#password');
//     container.simulate('change', {target: {name: 'password', value: 'hello'}});
//     expect(wrapper.state('password')).toEqual('hello');
//   })
// });

// describe('axios post works', () => {
//   let instance;
//   let mock;
//   let wrapper;
//   beforeEach(() => {
//     instance = axios.create();
//     mock = new MockAdapter(instance);
//     wrapper = shallow(<Login />)
//   })
//   it('correctly sets adapter', () => {
//     expect(instance.defaults.adapter).toBeDefined();
//   })
//   it('axios post works', () => {
//     mock.onPost('http:localhost:3000/user/login').reply(200);
//     return instance.post('http:localhost:3000/user/login', {username: 'eric', password: 'a'})
//     .then(response => {
//       expect(response.status).toEqual(200);
//     })
//   })
//   it('handleSubmit fires', () => {
//     wrapper.find('#username').simulate('change', {target: {name: 'username', value: 'adambarth611'}});
//     wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'hello'}});
//     const spy = jest.spyOn(wrapper.instance(), "handleSubmit");
//     wrapper.update();
//     wrapper.instance().forceUpdate();
//     wrapper.find('#submit').simulate('click', {preventDefault: () => {}});
//     expect(spy).toHaveBeenCalledTimes(1);
//   })
// })

