import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Login } from './Login';

configure({ adapter: new Adapter() });

let props = {};

describe('Login component', () => {
  beforeEach(() => {
    props = {
      auth: {
        isAuthenticated: false,
      },
      errors: {},
      loginUser: sinon.spy(),
      history: {
        push: sinon.spy(),
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

    // Set password input value to password, second argument is the 'e' parameter
    wrapper.find('input').last().simulate('change', { target: { id: 'password', value: 'password' } });
    expect(wrapper.state('password')).to.equal('password');
  });

  it('calls loginUser with the right user data when submit is clicked', () => {
    const wrapper = shallow(<Login {...props} />);
    wrapper.setState({ username: 'test' });
    const expected = { username: 'test', password: '' };

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(props.loginUser.callCount).to.equal(1);
    expect(props.loginUser.calledWith(expected, props.history)).to.be.true;
  });

  it('shows errors on the right input fields', () => {
    const wrapper = shallow(<Login {...props} />);
    props.errors = { username: 'username error', nothing: 'ignore this' };
    wrapper.setProps({ errors: props.errors });

    expect(wrapper.find('.error-text').first().text()).to.equal('username error');
  });

  it('redirects to the landing page when logged in', () => {
    const wrapper = shallow(<Login {...props} />);
    props.auth.isAuthenticated = true;
    wrapper.setProps({ auth: props.auth });

    expect(props.history.push.callCount).to.equal(1);
  });
});
