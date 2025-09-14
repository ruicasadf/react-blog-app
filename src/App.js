import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import Login from './components/Login';
import { AuthProvider } from './components/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="header">
            <nav className="nav">
              <Link to="/" className="logo">React Blog</Link>
              <div className="nav-links">
                <Link to="/" className="nav-link">Главная</Link>
                <Link to="/add" className="nav-link">Добавить пост</Link>
                <Login />
              </div>
            </nav>
          </header>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/add" element={<AddPost />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>© 2023 React Blog. Все права защищены.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;