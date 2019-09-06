import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchUser, logoutUser, signupUser } from '../../client/actions/userAction';


const mock = new MockAdapter(axios);
const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

describe('test userActions', () => {
  describe('test fetchuser action', () => {
    let store;
    beforeEach(() => {
      store = mockStore({});
    })
    it('test expected actions are dispatched on call', async () => {
      const expectedActions = [
        {type: 'FETCH_USER_BEGIN'},
        {type: 'FETCH_USER_SUCCESS'}
      ]
      mock.onPost('http://localhost:3000/user/login').reply(200);
      await store.dispatch(fetchUser('eric', 'hello'));
      expect(store.getActions()).toEqual(expectedActions)
    })
    it('test fails properly', async () => {
      const expectedActions = [
        {type: 'FETCH_USER_BEGIN'},
        {type: 'FETCH_USER_FAILURE'}
      ]
      mock.onPost('http://localhost:3000/user/login').reply(400);
      await store.dispatch(fetchUser('lkjdsf', 'lkdsafja'));
      expect(store.getActions()).toEqual(expectedActions);
    })
  })
  describe('test logoutUser action', () => {
    let store;
    beforeEach(() => {
      store = mockStore({});
    })
    it('logs user out properly with 200 code', async () => {
      const expectedActions = [
        {type: 'FETCH_USER_BEGIN'},
        {type: 'LOGOUT_SUCCESS'}
      ]
      mock.onPost('http://localhost:3000/user/logout').reply(200);
      await store.dispatch(logoutUser());
      expect(store.getActions()).toEqual(expectedActions);
    })
    it('fails properly with axios 400 code', async() => {
      const expectedActions = [
        {type: 'FETCH_USER_BEGIN'},
        {type: 'LOGOUT_FAILURE'}
      ]
      mock.onPost('http://localhost:3000/user/logout').reply(400);
      await store.dispatch(logoutUser())
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  describe('test signupUser action', () => {
    let store;
    let sendData;
    beforeEach(() => {
      sendData = {
        username: "username",
        email: "email@gmail.com",
        password:"hello"
      }
      store = mockStore({})
    })
    it('signup user works with 200 code', async () => {
      mock.onPost('http://localhost:3000/user/register', sendData).reply(200);
      const expectedActions = [
        {type: 'FETCH_USER_BEGIN'},
        {type: 'FETCH_USER_SUCCESS'}
      ]
      await store.dispatch(signupUser(sendData.username, sendData.email, sendData.password));
      expect(store.getActions()).toEqual(expectedActions)
    })
    it('signup user fails properly with 400 code', async () => {
      mock.onPost('http://localhost:3000/user/register', sendData).reply(400);
      const expectedActions = [
        {type: 'FETCH_USER_BEGIN'},
        {type: 'FETCH_USER_FAILURE'}
      ]
      await store.dispatch(signupUser(sendData.username, sendData.email, sendData.password))
      expect(store.getActions()).toEqual(expectedActions);
    })
  })
})  