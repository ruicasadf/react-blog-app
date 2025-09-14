import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPost.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Загрузка данных поста для редактирования
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) throw new Error('Пост не найден');
        const postData = await response.json();
        setTitle(postData.title);
        setBody(postData.body);
      } catch (error) {
        setError('Не удалось загрузить пост');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: parseInt(id),
          title,
          body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) throw new Error('Ошибка при обновлении поста');
      
      alert('Пост успешно обновлен!');
      navigate('/');
    } catch (error) {
      setError('Ошибка при обновлении поста');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить этот пост?')) return;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Ошибка при удалении поста');
      
      alert('Пост успешно удален!');
      navigate('/');
    } catch (error) {
      setError('Ошибка при удалении поста');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="edit-post">
      <h1>Редактировать пост</h1>
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
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
          <button type="button" onClick={handleDelete} className="delete-btn">
            Удалить пост
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="cancel-btn"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;