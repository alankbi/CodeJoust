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

const defaults = {
  'text/x-java': 'public enum Enum {\n\tVAL1, VAL2, VAL3\n}',
  javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      code: defaults['text/x-java'],
      mode: 'text/x-java',
    });

    this.changeMode = this.changeMode.bind(this);
  }

  updateCode(code) {
    this.setState({ code });
  }

  changeMode(e) {
    const mode = e.target.value;
    this.setState({
      mode,
      code: defaults[mode],
    });
  }


  render() {
    const { code, mode } = this.state;
    const options = {
      lineNumbers: true,
      theme: 'default',
      mode,
      value: code,
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
        <CodeMirror value={code} onChange={this.updateCode} options={options} />
        <select id="language" onChange={this.changeMode} value={mode}>
          <option value="text/x-java">Java</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>
    );
  }
}

export default App;
