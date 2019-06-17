import React from 'react';
import CodeMirror from 'react-codemirror';
import logo from './logo.svg';
import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/php/php';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/go/go';
import 'codemirror/mode/rust/rust';
import 'codemirror/theme/rubyblue.css';

// eslint-disable-next-line max-len
// I've really gotten lost trying a bunch of different stuff, so sorry the code is a bit of a jumble rn.

const defaults = {
  clike: 'public enum Enum {\n\tVAL1, VAL2, VAL3\n}',
  javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      code: defaults.clike,
      mode: 'clike',
    });

    this.showAPICallText = this.showAPICallText.bind(this);
  }

  componentDidMount() {
    this.showAPICallText();
    // updateCode(??);
  }

  updateCode(newCode) {
    this.setState({
      code: newCode,
    });
  }

  changeMode(e) {
    var mode = e.target.value;
    this.setState({
      mode: mode,
      code: defaults[mode],
    });
  }

  async showAPICallText() {
    const response = await fetch('/api/hello/');
    const json = await response.json();
    const { code } = json;
    this.setState({ code });
  }

  render() {
    let options = {
      lineNumbers: true,
      name: 'clike',
      theme: 'rubyblue',
      mode: this.state.mode,
    };
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
        <select id="language" onChange={this.changeMode}>
          <option value="clike">Java</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
    );
  }
}

export default App;
