import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SET_USER, GET_ERRORS } from './types';
import {
  setUser, loginUser, registerUser, logOut
} from './authActions';

configure({ adapter: new Adapter() });

// Decoded token returns { username: 'test' }
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
  + 'eyJ1c2VybmFtZSI6InRlc3QifQ.hNQI_r8BATy1LyXPr6Zuo9X_V0kSED8ngcqQ6G-WV5w';
const userData = { username: 'test' };

describe('authActions', () => {
  it('returns the right type and payload for setUser', () => {
    const result = setUser(userData);
    const expected = { type: SET_USER, payload: userData };
    expect(result).to.deep.equal(expected);
  });

  it('calls the right API url and redirects when finished registering', (done) => {
    const stub = sinon.stub(axios, 'post');
    stub.resolves({});
    const history = {
      push: sinon.spy(() => {
        try {
          expect(history.push.calledWith('/login')).to.be.true;
          done();
        } catch (e) {
          done(e);
        }
      }),
    };
    registerUser(userData, history)({});

    expect(stub.callCount).to.equal(1);
    expect(stub.getCall(0).args[0]).to.equal('/api/auth/register');
    expect(stub.getCall(0).args[1]).to.deep.equal(userData);
    stub.restore();
  });

  it('dispatches the right action when registering fails', (done) => {
    const stub = sinon.stub(axios, 'post');
    stub.rejects({ response: { data: 'test' } });
    const responseFunction = registerUser(userData, {});

    responseFunction((action) => {
      try {
        expect(action.type).to.equal(GET_ERRORS);
        expect(action.payload).to.equal('test');
        done();
      } catch (e) {
        done(e);
      }
    });

    expect(stub.callCount).to.equal(1);
    stub.restore();
  });

  it('calls the right API url and redirects when finished logging in', (done) => {
    const axiosStub = sinon.stub(axios, 'post');
    axiosStub.resolves({ data: { token } });
    // const localStorageStub = sinon.stub(localStorage, 'setItem');

    const history = { push: sinon.spy() };

    const responseFunction = loginUser(userData, history);
    responseFunction((action) => {
      try {
        expect(action.type).to.equal(SET_USER);
        expect(action.payload).to.deep.equal({ username: 'test' });

        expect(localStorage.jwtToken).to.equal(token);
        expect(axios.defaults.headers.common.Authorization).to.equal(token);
        expect(history.push.calledWith('/')).to.be.true;
        done();
      } catch (e) {
        done(e);
      }
    });

    expect(axiosStub.callCount).to.equal(1);
    expect(axiosStub.getCall(0).args[0]).to.equal('/api/auth/login');
    expect(axiosStub.getCall(0).args[1]).to.deep.equal(userData);

    axiosStub.restore();
  });

  it('dispatches the right action when logging in fails', (done) => {
    const stub = sinon.stub(axios, 'post');
    stub.rejects({ response: { data: 'test login' } });
    const responseFunction = loginUser(userData, {});

    responseFunction((action) => {
      try {
        expect(action.type).to.equal(GET_ERRORS);
        expect(action.payload).to.equal('test login');
        done();
      } catch (e) {
        done(e);
      }
    });

    expect(stub.callCount).to.equal(1);
    stub.restore();
  });

  it('logs out properly', (done) => {
    const responseFunction = logOut();

    responseFunction((action) => {
      try {
        expect(action.type).to.equal(SET_USER);
        expect(action.payload).to.deep.equal({});

        expect(localStorage).to.not.have.any.keys('jwtToken');
        expect(axios.defaults.headers.common).to.not.have.any.keys('Authorization');
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
