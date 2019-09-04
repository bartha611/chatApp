import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchUser } from '../../client/actions/userAction';

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

describe('test userActions', () => {
  it('test expected actions are dispatched on call', () => {
    const store = mockStore({});
    const expectedActions = [
      'FETCH_USER_BEGIN',
      'FETCH_USER_SUCCESS'
    ]
    return store.dispatch(fetchUser('eric', 'a'))
    .then(() => {
      const actualActions = store.getActions().map(action => action.type);
      expect(actualActions).toEqual(expectedActions);
    })
  })
})  