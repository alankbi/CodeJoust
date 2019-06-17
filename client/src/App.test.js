import React from 'react';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Route } from 'react-router-dom';

import App from './App';
import NavBar from './components/layout/NavBar';
import LocalStorageMock from './utils/LocalStorageMock';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';

configure({ adapter: new Adapter() });
global.localStorage = new LocalStorageMock();

describe('App component', () => {
  it('contains a NavBar', () => {
    const wrapper = shallow(<App />);
    const app = <NavBar />;
    expect(wrapper.contains(app)).to.be.true;
  });

  it('renders the right routes', () => {
    const wrapper = shallow(<App />);

    // Gives you a dict where the key is the route path and the
    // value is the component it renders
    const pathMap = wrapper.find(Route).reduce((map, route) => {
      const routeProps = route.props();
      // eslint-disable-next-line no-param-reassign
      map[routeProps.path] = routeProps.component;
      return map;
    }, {});

    expect(pathMap['/']).to.equal(Landing);
    expect(pathMap['/login']).to.equal(Login);
  });
});
