import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Exchange from './pages/Exchange';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from './components/RegistrerForm';
import ConnectWallet from './components/ConnectWallet';
function PrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Router>
      <div>
          {/* Barra de navegación */}
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/exchange">Exchange</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
            {/* Botón para conectar la wallet */}
            <ConnectWallet />
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login/>} />
          <Route
            path="/exchange"
            element={
              <PrivateRoute>
                <Exchange />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

