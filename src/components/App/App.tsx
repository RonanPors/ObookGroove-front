import logo from '../../assets/logo/svg/logo1_bleuvert.svg';
import Footer from '../elements/Footer/Footer';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1>h1 coucou</h1>
        <h2>h2 coucou</h2>
        <h3>h3 coucou</h3>
        <h4>h4 coucou</h4>
        <p className="text-chapo">test .text-chapo</p>
        <p className="text-corpus">test .text-corpus</p>
        <p className="text-legend">test .text-legend</p>

        <p> Edit and save to reload.</p>
      </header>
      <Footer />
    </div>
  );
}

export default App;
