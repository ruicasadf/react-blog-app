import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        setError('Не удалось загрузить посты. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Функция для удаления поста
  const handleDeletePost = async (postId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот пост?')) return;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Ошибка при удалении поста');
      
      // Удаляем пост из локального состояния
      setPosts(posts.filter(post => post.id !== postId));
      alert('Пост успешно удален!');
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      alert('Ошибка при удалении поста');
    }
  };

  // Фильтрация постов по поисковому запросу
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Пагинация
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Сброс на первую страницу при поиске
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      <h1>Последние посты</h1>
      
      {/* Поиск */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск по заголовкам..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Список постов */}
      <div className="posts-grid">
        {currentPosts.length > 0 ? (
          currentPosts.map(post => (
            <div key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.body.substring(0, 100)}...</p>
              <div className="post-actions">
                <Link to={`/post/${post.id}`} className="read-more">
                  Читать
                </Link>
                <Link to={`/edit/${post.id}`} className="edit-btn">
                  Редактировать
                </Link>
                <button 
                  onClick={() => handleDeletePost(post.id)}
                  className="delete-btn"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-posts">Посты не найдены</div>
        )}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Назад
          </button>
          
          <span>Страница {currentPage} из {totalPages}</span>
          
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;