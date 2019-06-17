import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import LocalStorageMock from '../../utils/LocalStorageMock';
import { Login } from './Login';

configure({ adapter: new Adapter() });
// global.localStorage = new LocalStorageMock();

let props = {};

describe('Login component', () => {
  beforeEach(() => {
    props = {
      auth: {
        isAuthenticated: false,
      },
      errors: {},
      loginUser: sinon.fake(),
      history: {
        push: sinon.fake(),
      },
    };
  });

  it('has two input fields', () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('has input text and state changing together', () => {
    const wrapper = shallow(<Login {...props} />);
    wrapper.setState({ username: 'test' });
    expect(wrapper.find('input').first().props().value).to.equal('test');

    // Set password input value to password
    wrapper.find('input').first().simulate('change', { target: { id: 'password', value: 'password' } });
    expect(wrapper.state('password')).to.equal('password');
  });

  it('calls loginUser when submit is clicked', () => {
    const wrapper = shallow(<Login {...props} />);
    wrapper.find('.submit-button').simulate('click');
    expect(props.loginUser.callCount).to.equal(1);
  });
});

/**
 tests:
 shows errors
 redirects to home if logged in? can you test this? maybe mock history push function
 */
