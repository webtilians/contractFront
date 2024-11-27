import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.div`
  position: relative;
    width: 100%;
    padding: 62px;
    height: 400px;
    background: linear-gradient(135deg, rgb(25 46 55), rgba(0, 121, 145, 1));
    
    clip-path: polygon(47% -3%, 99% 30%, 88% 74%, 38% 92%, 8% 76%, 0% 24%);
    box-shadow: 0 0 15px rgb(50 167 164);
    background: repeating-radial-gradient(#193438, transparent 122px);
  &::before, &::after {
    content: '';
    position: absolute;
    width: 35%;
    height: 57%;
    background: inherit;
    border: inherit;
    clip-path: inherit;
    transform: translateY(-50%) rotate(30deg);
    top: 182px;
    left: 176px;
    z-index: -8;
  }

  &::after {
    content: '';
    position: absolute;
    
    background: inherit;
    border: inherit;
    clip-path: inherit;
    transform: translateY(-57%) rotate(0deg);
    
    top: 225px;
    left: 14px;
    opacity: 0.4;
    z-index: -1;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.base3};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 2px solid ${props => props.theme.colors.base2};
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.base3};
  color: ${props => props.theme.colors.base1};
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  background-color: ${props => props.theme.colors.base2};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.base3};
    color: ${props => props.theme.colors.base1};
  }
`;

function CreateTokenForm() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/contracts/create', {
        type: "token",
        data: { name, symbol, initialSupply }
      });
      const result = response.data;
      if (result && result.contractAddress) {
        toast.success('Token creado exitosamente!');
      } else {
        alert("Error: No se obtuvo la dirección del contrato.");
      }
    } catch (error) {
      console.error('Error al crear el token:', error);
      toast.error('Error al crear el token.');
    }
  };

  return (
    <FormContainer>
      <Title>Crear Token</Title>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Token:</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Símbolo del Token:</label>
          <Input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Suministro Inicial:</label>
          <Input
            type="number"
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Crear Token</Button>
      </form>
    </FormContainer>
  );
}

export default CreateTokenForm;
