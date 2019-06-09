import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
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

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;

    const userData = { username, password };

    console.log(userData);
  }

  render() {
    const { username, password, errors } = this.state;

    return (
      <div className="container">
        <h1>Login</h1>
        <p>
          Register
          <Link to="/register"> here</Link>
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
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
