'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { getUserFromToken } from '../utils/auth';

interface Article {
  id: number;
  title: string;
  content: string;
  isPublished: boolean;
  author: { email: string };
}

interface User {
  email: string;
  role: 'ADMIN' | 'USER';
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const currentUser = getUserFromToken() as User | null;
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    api
      .get('/articles')
      .then((res) => setArticles(res.data))
      .catch((err) => console.error('Erreur lors du chargement des articles :', err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer cet article ?')) return;
    try {
      await api.delete(`/articles/${id}`);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      alert('Article supprimé avec succès ');
    } catch (err) {
      alert('Erreur lors de la suppression ');
      console.error(err);
    }
  };

  if (!mounted) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', marginTop: '120px' }}>
          <h2>Chargement...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
          }}
        >
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>
            <span style={{ color: '#000000' }}>Easy</span>
            <span style={{ color: '#16a34a' }}>Bank</span>
          </h1>

          <p style={{ color: '#4b5563', marginBottom: '25px', fontSize: '1.05rem' }}>
            Veuillez vous connecter ou créer un compte pour accéder aux articles.
          </p>

          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/login">
              <button
                style={{
                  backgroundColor: '#000000',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Login
              </button>
            </Link>

            <Link href="/register">
              <button
                style={{
                  backgroundColor: '#16a34a',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const visibleArticles =
    user.role === 'ADMIN' ? articles : articles.filter((a) => a.isPublished);

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '750px', margin: '40px auto' }}>
        <h2
          style={{
            color: '#1e3a8a',
            textAlign: 'center',
            marginBottom: '25px',
            fontWeight: 'bold',
          }}
        >
          Liste des articles
        </h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>Chargement...</p>
        ) : visibleArticles.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280' }}>
            Aucun article disponible.
          </p>
        ) : (
          visibleArticles.map((article) => (
            <div
              key={article.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb',
              }}
            >
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '8px',
                }}
              >
                {article.title}
              </h3>
              <p style={{ color: '#374151', marginBottom: '10px', lineHeight: '1.5' }}>
                {article.content}
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                Par {article.author.email}
              </p>

              {user?.role === 'ADMIN' && (
                <>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginTop: '8px',
                      color: article.isPublished ? '#16a34a' : '#dc2626',
                    }}
                  >
                    {article.isPublished ? ' Publié' : 'Non publié'}
                  </p>

                  {/* Boutons Edit / Delete */}
                  <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => router.push(`/articles/update/${article.id}`)}
                      style={{
                        backgroundColor: '#16a34a',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                      }}
                    >
                       Edit
                    </button>

                    <button
                      onClick={() => handleDelete(article.id)}
                      style={{
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
