import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function CreateTokenForm() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/contracts/create', {
        type: "token",
        data:
        {name,
        symbol,
        initialSupply}
      });
      console.log(response.data)
      const result = response.data;
      console.log("result",result)
      if (result && result.contractAddress) {
        toast.success('Token creado exitosamente!');
      } else {
        alert("Error: No se obtuvo la dirección del contrato.");
      }
    //   if (result.contractAddress) {
    //     toast.success('Token creado exitosamente!');
    //   } else {
    //     toast.error('Error al crear el token.');
    //   }
    } catch (error) {
      console.error('Error al crear el token:', error);
      toast.error('Error al crear el token.');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del Token:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Símbolo del Token:</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Suministro Inicial:</label>
        <input
          type="number"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
          required
        />
      </div>
      <button type="submit">Crear Token</button>
    </form>
    </>
  );
}

export default CreateTokenForm;
