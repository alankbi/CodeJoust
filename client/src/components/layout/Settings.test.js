import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Settings } from './Settings';

configure({ adapter: new Adapter() });

let props = {};

describe('Settings component', () => {
  beforeEach(() => {
    props = {
      auth: {
        isAuthenticated: true,
        user: {
          username: 'testusername',
          email: 'test@email.com',
        },
      },
      logOut: sinon.spy(),
      history: {
        push: sinon.spy(),
      },
    };
  });

  it('displays username and email of logged in user', () => {
    const wrapper = shallow(<Settings {...props} />);
    expect(wrapper.text()).to.have.string('testusername');
    expect(wrapper.text()).to.have.string('test@email.com');
  });

  it('calls logOut and redirects to login page when the log out button is clicked', () => {
    const wrapper = shallow(<Settings {...props} />);
    wrapper.find('.logout-button').simulate('click', { preventDefault: () => {} });

    expect(props.logOut.callCount).to.equal(1);
    expect(props.history.push.callCount).to.equal(1);
  });
});
