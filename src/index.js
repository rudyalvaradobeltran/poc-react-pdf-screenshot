import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Screenshot from './Screenshot';
import Pato from './Pato';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <Screenshot componente={Pato} nombreArchivo={'pato'} />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);