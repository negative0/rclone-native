import { exec } from 'child_process';
import path from 'path';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';

const Hello = () => {
  const [output, setOutput] = React.useState('');

  function callPython() {
    const rcloneBinary = path.join(__dirname, 'assets', 'rclone', 'rclone');
    // const pythonScript = 'print("Hello World from Python")';

    exec(
      `${rcloneBinary} rcd --rc-web-gui --rc-addr=:5572 --rc-user=chaitanya --rc-pass=abcd`,
      (error, stdout) => {
        if (error) {
          setOutput(error.message);
        } else {
          setOutput(stdout);
        }
      }
    );
    // window.location.href = 'http://localhost:5572';
  }
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <button type="button" onClick={callPython}>
          Call Rclone binary
        </button>
        <p>{`stdout: ${output}`}</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </HashRouter>
  );
}
