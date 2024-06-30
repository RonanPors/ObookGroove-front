import { Container } from 'react-bootstrap';
import logo from '../../assets/logo/svg/logo1_bleuvert.svg';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Container fluid="md">
          <h1>h1 coucou</h1>
          <h2>h2 coucou</h2>
          <h3>h3 coucou</h3>
          <h4>h4 coucou</h4>
          <p className="text-chapo">test .text-chapo</p>
          <p className="text-corpus">test .text-corpus</p>
          <p className="text-legend">test .text-legend</p>

          <p> Edit and save to reload.</p>
        </Container>

        <a
          className="App-link"
          href="https://react.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
