// components/PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загрузка данных поста
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(postData => {
        setPost(postData);
        
        // Загрузка комментариев
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      })
      .then(response => response.json())
      .then(commentsData => {
        setComments(commentsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка загрузки данных:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!post) {
    return <div className="error">Пост не найден</div>;
  }

  return (
    <div className="post-detail">
      <Link to="/" className="back-link">← Назад к списку постов</Link>
      <article className="post">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>

      <section className="comments">
        <h2>Комментарии ({comments.length})</h2>
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <h4>{comment.name}</h4>
            <p className="comment-email">{comment.email}</p>
            <p>{comment.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PostDetail;