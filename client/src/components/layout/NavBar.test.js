import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import { NavBar } from './NavBar';

configure({ adapter: new Adapter() });

let props = {};

describe('NavBar component', () => {
  beforeEach(() => {
    props = {
      auth: {
        isAuthenticated: true,
      },
    };
  });

  it('links to settings page when logged in', () => {
    const wrapper = mount(<MemoryRouter><NavBar {...props} /></MemoryRouter>);
    expect(wrapper.find('a[href="/settings"]')).to.have.length(1);
    expect(wrapper.contains('a[href="/login"]')).to.be.false;
  });

  it('links to login page when not logged in', () => {
    props.auth.isAuthenticated = false;
    const wrapper = mount(<MemoryRouter><NavBar {...props} /></MemoryRouter>);
    expect(wrapper.find('a[href="/login"]')).to.have.length(1);
    expect(wrapper.contains('a[href="/settings"]')).to.be.false;
  });
});
