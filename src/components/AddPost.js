// components/AddPost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPost.css';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Имитация отправки данных на сервер
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Пост успешно добавлен:', data);
        setLoading(false);
        alert('Пост успешно добавлен!');
        navigate('/');
      })
      .catch(error => {
        console.error('Ошибка при добавлении поста:', error);
        setLoading(false);
      });
  };

  return (
    <div className="add-post">
      <h1>Добавить новый пост</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Заголовок:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Содержание:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Добавление...' : 'Добавить пост'}
        </button>
      </form>
    </div>
  );
};

export default AddPost;