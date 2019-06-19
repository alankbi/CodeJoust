import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import authReducer from './authReducer';
import { SET_USER } from '../actions/types'

configure({ adapter: new Adapter() });

describe('authReducer', () => {
  it('sets the user correctly', () => {
    const action = { type: SET_USER, payload: { username: 'test' } };
    const state = authReducer(undefined, action);
    expect(state).to.deep.equal({ user: action.payload, isAuthenticated: true });
  });

  it('sets an empty user correctly', () => {
    const action = { type: SET_USER, payload: {} };
    const state = authReducer({ isAuthenticated: true }, action);
    expect(state).to.deep.equal({ isAuthenticated: false, user: {} });
  });
});
