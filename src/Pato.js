import React from 'react';
import PatoImagen from './pato.jpg';

const Pato = () => {
  return (
    <header className="header">
      <img src={PatoImagen} className="pato" alt="pato" />
      <p>
        Hola
      </p>
    </header>
  );
}

export default Pato;
