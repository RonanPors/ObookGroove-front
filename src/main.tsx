import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';
import 'semantic-ui-css/semantic.min.css';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

