import React from 'react';
import PatoImagen from './pato.jpg';

const Pato = ({ texto }) => {
  return (
    <header className="header">
      <img src={PatoImagen} className="pato" alt="pato" />
      <p>
        {texto}
      </p>
    </header>
  );
}

export default Pato;
