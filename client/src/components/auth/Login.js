import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { loginUser } from '../../store/actions/authActions';

export class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { auth, history } = this.props;
    if (auth.isAuthenticated) {
      history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      const { history } = this.props;
      history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;

    const userData = { username, password };
    const { history } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.loginUser(userData, history);
  }

  render() {
    const { username, password, errors } = this.state;

    return (
      <div className="login container">
        <h1>Login</h1>
        <p>
          Register
          <Link to="/register"> here</Link>
        </p>
        <form noValidate onSubmit={this.onSubmit}>
          <label htmlFor="username">
            Username
            <input
              className={classNames('input-field', { invalid: errors.username })}
              onChange={this.onChange}
              value={username}
              error={errors.username}
              id="username"
              type="text"
            />
          </label>
          <span className="error-text">{errors.username}</span>
          <label htmlFor="password">
            Password
            <input
              className={classNames('input-field', { invalid: errors.password })}
              onChange={this.onChange}
              value={password}
              error={errors.password}
              id="password"
              type="password"
            />
          </label>
          <span className="error-text">{errors.password}</span>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.objectOf(PropTypes.object).isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
