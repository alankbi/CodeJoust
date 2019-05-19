import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <p>{text}</p>
      </div>
    );
  }
}

export default App;
