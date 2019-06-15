import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { registerUser } from '../../store/actions/authActions';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
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

    const {
      username, email, password, confirmPassword,
    } = this.state;

    const newUser = {
      username, email, password, confirmPassword,
    };

    const { history } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    this.props.registerUser(newUser, history);
  }

  render() {
    const {
      username, email, password, confirmPassword, errors,
    } = this.state;

    return (
      <div className="container">
        <h1>Register</h1>
        <p>
          Login
          <Link to="/login"> here</Link>
        </p>
        <form noValidate onSubmit={this.onSubmit}>
          <label htmlFor="username">
            Username
            <input
              // Gives classes input-field and invalid if error.name exists
              className={classNames('input-field', { invalid: errors.username })}
              onChange={this.onChange}
              value={username}
              error={errors.username}
              id="username"
              type="text"
            />
          </label>
          <span className="error-text">{errors.username}</span>
          <label htmlFor="email">
            Email
            <input
              className={classNames('input-field', { invalid: errors.email })}
              onChange={this.onChange}
              value={email}
              error={errors.email}
              id="email"
              type="email"
            />
          </label>
          <span className="error-text">{errors.email}</span>
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
          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              className={classNames('input-field', { invalid: errors.confirmPassword })}
              onChange={this.onChange}
              value={confirmPassword}
              error={errors.confirmPassword}
              id="confirmPassword"
              type="password"
            />
          </label>
          <span className="error-text">{errors.confirmPassword}</span>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.objectOf(PropTypes.object).isRequired,
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

// Makes redux state available through props as well as other things like
// the registerUser action and router history/location stuff
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
