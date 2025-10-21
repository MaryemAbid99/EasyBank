'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../../utils/api';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import { getUserFromToken } from '../../../utils/auth';

interface Article {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
}

export default function UpdateArticle() {
  const router = useRouter();
  const { id } = router.query;
  const user = getUserFromToken();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    if (!user || user.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    api
      .get(`/articles/${id}`)
      .then((res) => {
        const { id: articleId, title, content, isPublished } = res.data;
        setArticle({
          id: articleId,
          title: title ?? '',
          content: content ?? '',
          isPublished: isPublished ?? false,
        });
      })
      .catch(() => setError('Erreur lors du chargement de l’article.'))
      .finally(() => setLoading(false));
  }, [id]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;

    try {
      await api.patch(`/articles/${id}`, {
        title: article.title,
        content: article.content,
        isPublished: article.isPublished,
      });
      alert('Article mis à jour avec succès ');
      router.push('/');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Erreur PATCH:', err.response?.data || err.message);
      } else {
        console.error('Erreur inconnue:', err);
      }
      setError('Erreur lors de la mise à jour de l’article ');
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!article) return <p>Aucun article trouvé.</p>;

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h2
          style={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            marginBottom: '20px',
            color: '#16a34a',
            textAlign: 'center',
          }}
        >
           Modifier l’article
        </h2>

        <form onSubmit={handleSubmit}>
          <label>Titre :</label>
          <input
            type="text"
            placeholder="Titre"
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
            required
          />

          <label>Contenu :</label>
          <textarea
            placeholder="Contenu"
            rows={6}
            value={article.content}
            onChange={(e) => setArticle({ ...article, content: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
            required
          />

          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <input
              type="checkbox"
              checked={article.isPublished}
              onChange={(e) => setArticle({ ...article, isPublished: e.target.checked })}
              style={{ marginRight: '8px' }}
            />
            Publié
          </label>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Mettre à jour
            </button>

            <button
              type="button"
              onClick={() => router.push('/')}
              style={{
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              ⬅️ Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
