import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, logout, user, isAuthenticated } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
    } else {
      setError('Неверные учетные данные');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="user-info">
        <span>Привет, {user.username}!</span>
        <button onClick={logout} className="logout-btn">Выйти</button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;