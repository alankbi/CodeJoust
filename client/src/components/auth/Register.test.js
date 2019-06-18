import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Register } from './Register';

configure({ adapter: new Adapter() });

let props = {};

describe('Register component', () => {
  beforeEach(() => {
    props = {
      auth: {
        isAuthenticated: false,
      },
      errors: {},
      registerUser: sinon.spy(),
      history: {
        push: sinon.spy(),
      },
    };
  });

  it('has four input fields', () => {
    const wrapper = shallow(<Register {...props} />);
    expect(wrapper.find('input')).to.have.length(4);
  });

  it('has input text and state changing together', () => {
    const wrapper = shallow(<Register {...props} />);
    wrapper.setState({ username: 'test' });
    expect(wrapper.find('input').first().props().value).to.equal('test');

    // Set email input value to email, second argument is the 'e' parameter
    wrapper.find('input').last().simulate('change', { target: { id: 'email', value: 'email' } });
    expect(wrapper.state('email')).to.equal('email');
  });

  it('calls registerUser with the right user data when submit is clicked', () => {
    const wrapper = shallow(<Register {...props} />);
    wrapper.setState({ username: 'test' });
    wrapper.setState({ confirmPassword: 'confirm' });
    const expected = {
      username: 'test',
      email: '',
      password: '',
      confirmPassword: 'confirm',
    };

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(props.registerUser.callCount).to.equal(1);
    expect(props.registerUser.calledWith(expected, props.history)).to.be.true;
  });

  it('shows errors on the right input fields', () => {
    const wrapper = shallow(<Register {...props} />);
    props.errors = { password: 'password error', nothing: 'ignore' };
    wrapper.setProps({ errors: props.errors });

    expect(wrapper.find('.error-text').at(2).text()).to.equal('password error');
  });

  it('redirects to the landing page when logged in', () => {
    const wrapper = shallow(<Register {...props} />);
    props.auth.isAuthenticated = true;
    wrapper.setProps({ auth: props.auth });

    expect(props.history.push.callCount).to.equal(1);
  });
});
