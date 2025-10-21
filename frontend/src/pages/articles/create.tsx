import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { getUserFromToken } from '../../utils/auth';

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = getUserFromToken();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/articles', { title, content, isPublished });
      alert(isPublished ? ' Article publié avec succès !' : ' Article ajouté en brouillon.');
      router.push('/');
    } catch (error) {
      alert('Erreur lors de la création.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Créer un article</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Contenu"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <label>Ajouter & Publier</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn ${isPublished ? 'btn-publish' : 'btn-draft'}`}
          >
            {loading
              ? ' Envoi...'
              : isPublished
              ? 'Ajouter & Publier'
              : 'Ajouter sans publier'}
          </button>
        </form>
      </div>
    </div>
  );
}
