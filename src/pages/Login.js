import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserAddress, setIsLoggedIn } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        dispatch(setIsLoggedIn(true));
        toast.success('Inicio de sesión exitoso');
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Error al iniciar sesión, verifica tus credenciales');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
