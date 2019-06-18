import React from 'react';
import { expect } from 'chai';
import { Redirect, MemoryRouter } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ProtectedRoute } from './ProtectedRoute';
import { Landing } from '../layout/Landing';

configure({ adapter: new Adapter() });

let props = {};

describe('ProtectedRoute component', () => {
  beforeEach(() => {
    props = {
      auth: {
        isAuthenticated: true,
      },
      component: Landing, // any component works to test this
    };
  });

  it('renders the component given in props', () => {
    const wrapper = mount(<MemoryRouter><ProtectedRoute {...props} /></MemoryRouter>);
    expect(wrapper.find(Landing)).to.have.length(1);
    expect(wrapper.exists(Redirect)).to.be.false; // should not redirect to login page
  });

  it('redirects if not authenticated', () => {
    props.auth.isAuthenticated = false;
    const wrapper = mount(<MemoryRouter><ProtectedRoute {...props} /></MemoryRouter>);
    expect(wrapper.find(Redirect)).to.have.length(1);
    expect(wrapper.exists(Landing)).to.be.false;
  });
});
