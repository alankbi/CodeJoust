import React from 'react';
import { Link } from 'react-router-dom';

import CodeEditor from '../code/CodeEditor';

export class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ text: '' });
  }

  render() {
    const { text } = this.state;
    return (
      <div className="landing container">
        <h1>CodeJoust</h1>
        <h4>This is the landing page for CodeJoust</h4>

        <Link to="/login">
          Login
        </Link>
        <Link to="/register">
          Register
        </Link>
        <p>{text}</p>
        <CodeEditor />
      </div>
    );
  }
}

export default Landing;
