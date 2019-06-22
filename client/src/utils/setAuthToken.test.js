import axios from 'axios';
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import setAuthToken from './setAuthToken';

configure({ adapter: new Adapter() });

describe('setAuthToken function', () => {
  it('sets the token and deletes it when the token is empty', () => {
    setAuthToken('test');
    expect(axios.defaults.headers.common.Authorization).to.equal('test');

    setAuthToken();
    expect(axios.defaults.headers.common).to.not.have.any.keys('Authorization');
  });
});
