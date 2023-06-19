import React from 'react';
import { useParams } from 'react-router-dom';

function SecondScreen() {
  const { param1, param2 } = useParams();

  // Utiliza los parámetros param1 y param2 según tus necesidades

  return (
    <div>
      <h1>Pantalla secundaria</h1>
      <p>Parámetro 1: {param1}</p>
      <p>Parámetro 2: {param2}</p>
    </div>
  );
}

export default SecondScreen;
