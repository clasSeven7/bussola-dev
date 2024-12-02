'use client';

import Navbar from '@/components/navbar';
import api from '@/services/api';
import { Folder } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateProject() {
  const router = useRouter();

  interface User {
    id: string;
    name: string;
  }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [technologies, setTechnologies] = useState('');
  const [techError, setTechError] = useState('');
  const [user, setUser] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get('/users/')
      .then((response) => setUsers(response.data.results))
      .catch((error) => {
        if (error.response?.status === 401) {
          alert('Sessão expirada. Faça login novamente.');
          localStorage.removeItem('token');
        } else {
          console.error('Erro ao carregar usuários:', error);
        }
      });
  }, []);

  const validateTechnologies = (value: string) => {
    try {
      JSON.parse(value);
      setTechError('');
    } catch {
      setTechError('Formato inválido. Certifique-se de que é um JSON válido.');
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    // Verifica se a imagem foi selecionada e a adiciona ao FormData
    if (image) {
      formData.append('image', image); // Certifique-se de que 'image' é um File
    }

    // Valida e adiciona o campo 'technologies' como JSON válido
    try {
      const techData = JSON.parse(technologies);
      formData.append('technologies', JSON.stringify(techData)); // Envia como string JSON
    } catch {
      alert(
        'Erro ao processar o campo Tecnologias. Certifique-se de que está no formato JSON válido.'
      );
      setLoading(false);
      return;
    }

    // Certifica-se de que o campo 'user' é enviado corretamente
    if (user) {
      formData.append('user', user); // Envia o ID do usuário selecionado
    } else {
      alert('Por favor, selecione um usuário.');
      setLoading(false);
      return;
    }

    try {
      await api.post('/projects/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Cabeçalho de autenticação
        },
      });

      // Redireciona após sucesso
      router.push('/projetos');
    } catch (error: any) {
      if (error.response) {
        alert(`Erro: ${error.response.data.detail || 'Falha no servidor.'}`);
      } else {
        alert('Erro de rede. Verifique sua conexão.');
      }
      console.error('Erro ao salvar o projeto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white mt-24">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-6">
            <Folder className="w-8 h-8 inline-block mr-2" />
            Criar Projeto
          </h1>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-lg font-semibold mb-2"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-lg font-semibold mb-2"
              >
                Descrição
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-lg font-semibold mb-2"
              >
                Imagem
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="technologies"
                className="block text-lg font-semibold mb-2"
              >
                Tecnologias
              </label>
              <pre className="bg-zinc-900 p-4 mb-2 border border-none rounded text-green-500">
                <code>
                  {
                    '{\n  "backend": ["Django"], \n  "frontend": ["React", "TailwindCSS"]\n}'
                  }
                </code>
              </pre>
              <input
                type="text"
                id="technologies"
                value={technologies}
                onChange={(e) => {
                  setTechnologies(e.target.value);
                  validateTechnologies(e.target.value);
                }}
                className={`w-full p-3 rounded-md bg-zinc-800 text-white border ${
                  techError ? 'border-red-500' : 'border-zinc-700'
                }`}
                required
              />
              {techError && (
                <p className="text-red-500 text-sm mt-1">{techError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="user"
                className="block text-lg font-semibold mb-2"
              >
                Usuário
              </label>
              {users.length === 0 ? (
                <p>Carregando usuários...</p>
              ) : (
                <select
                  id="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                  required
                >
                  <option value="">Selecione um usuário</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-zinc-800 text-white px-6 py-3 rounded-md hover:bg-zinc-700 disabled:bg-zinc-600"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
