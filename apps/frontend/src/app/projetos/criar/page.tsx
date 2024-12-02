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

  // Carrega a lista de usuários
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

  // Valida o JSON para o campo tecnologias
  const validateTechnologies = (value: string) => {
    try {
      JSON.parse(value);
      setTechError('');
    } catch {
      setTechError('Formato inválido. Certifique-se de que é um JSON válido.');
    }
  };

  // Lida com o envio do formulário
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Adicionando dados ao FormData
    formData.append('title', title || '');
    formData.append('description', description || '');

    if (image) {
      formData.append('image', image);
    }

    try {
      const techData = JSON.parse(technologies || '{}');
      formData.append('technologies', JSON.stringify(techData));
    } catch {
      alert(
        'Erro no campo Tecnologias. Certifique-se de que está no formato JSON válido.'
      );
      setLoading(false);
      return;
    }

    if (!user) {
      alert('Por favor, selecione um usuário.');
      setLoading(false);
      return;
    }

    formData.append('user', user);

    console.log(formData.get('title'));

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token não encontrado. Por favor, faça login novamente.');
        return;
      }

      await api.post('/projects/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Se estiver enviando um arquivo
        },
      });

      alert('Projeto salvo com sucesso!');
      router.push('/projetos');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Erro ao salvar o projeto:', error); // Log completo do erro

      if (error.response) {
        alert(
          `Erro: ${error.response.status} - ${
            error.response.data.detail || 'Detalhes não disponíveis.'
          }`
        );
      } else {
        alert('Erro desconhecido ao salvar o projeto.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Exibição de mensagens de erro
  const ErrorMessage = ({ message }: { message: string }) => (
    <p className="text-red-500 text-sm mt-1">{message}</p>
  );

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
              <textarea
                id="technologies"
                value={technologies}
                onChange={(e) => {
                  setTechnologies(e.target.value);
                  validateTechnologies(e.target.value);
                }}
                className={`w-full h-32 p-3 rounded-md bg-zinc-800 text-white border ${
                  techError ? 'border-red-500' : 'border-zinc-700'
                }`}
                required
              />
              {techError && <ErrorMessage message={techError} />}
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
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 disabled:bg-blue-400"
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
