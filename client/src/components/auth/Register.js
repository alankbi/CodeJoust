import React from 'react';
import { Link } from 'react-router-dom';

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

    console.log(newUser);
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
              className="input-field"
              onChange={this.onChange}
              value={username}
              error={errors.username}
              id="username"
              type="text"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              className="input-field"
              onChange={this.onChange}
              value={email}
              error={errors.email}
              id="email"
              type="email"
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className="input-field"
              onChange={this.onChange}
              value={password}
              error={errors.password}
              id="password"
              type="password"
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              className="input-field"
              onChange={this.onChange}
              value={confirmPassword}
              error={errors.confirmPassword}
              id="confirmPassword"
              type="password"
            />
          </label>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
