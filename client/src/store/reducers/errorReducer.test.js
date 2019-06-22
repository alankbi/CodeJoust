import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import errorReducer from './errorReducer';
import { GET_ERRORS } from '../actions/types'

configure({ adapter: new Adapter() });

describe('errorReducer', () => {
  it('returns the given errors', () => {
    const action = { type: GET_ERRORS, payload: { username: 'test error' } };
    const state = errorReducer(undefined, action);
    expect(state).to.deep.equal({ username: action.payload.username });
  });
});
