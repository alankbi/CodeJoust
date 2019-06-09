import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({ text: '' });

    this.showAPICallText = this.showAPICallText.bind(this);
  }

  componentDidMount() {
    this.showAPICallText();
  }

  async showAPICallText() {
    const response = await fetch('/api/hello/');
    const json = await response.json();
    const { text } = json;
    this.setState({ text });
  }

  render() {
    const { text } = this.state;
    return (
      <div className="container">
        <h1>CodeJoust</h1>
        <h4>This is the landing page for CodeJoust</h4>

        <Link to="/login">
          Login
        </Link>
        <Link to="/register">
          Register
        </Link>
        <p>{text}</p>
      </div>
    );
  }
}

export default Landing;
