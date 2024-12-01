'use client';

import { Folder } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';

export default function CreateProject() {
  const router = useRouter();

  // Estados para armazenar os dados do projeto
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null); // Ajustado para armazenar o arquivo
  const [technologies, setTechnologies] = useState('');
  const [user, setUser] = useState('');
  const [users, setUsers] = useState<any[]>([]);

  // Busca os usuários no banco de dados ao montar o componente
  useEffect(() => {
    fetch('http://localhost:8000/api/users/') // Altere para a URL correta da sua API
      .then((response) => response.json())
      .then((data) => {
        console.log('Usuários recebidos:', data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Resposta inesperada da API:', data);
        }
      })
      .catch((error) => console.error('Erro ao buscar usuários:', error));
  }, []);

  // Função para salvar o projeto no banco de dados
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    if (image) {
      formData.append('image', image); // Envia o arquivo de imagem
    }

    // Verifique se o campo tecnologias contém um formato JSON válido
    try {
      const techData = JSON.parse(technologies);
      formData.append('technologies', JSON.stringify(techData)); // Envia tecnologias como JSON
    } catch (error) {
      console.error('Erro ao processar tecnologias:', error);
      return; // Impede o envio se o JSON estiver inválido
    }

    formData.append('users', JSON.stringify([user])); // Envia o usuário selecionado como array

    // Envio para a API do backend Django
    try {
      const response = await fetch('http://localhost:8000/api/projects/', {
        method: 'POST',
        body: formData, // Usando FormData para envio de arquivos
      });

      if (response.ok) {
        // Redireciona após sucesso
        router.push('/projetos');
      } else {
        console.error('Erro ao salvar o projeto');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
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
              <div className="flex items-center justify-left text-center mb-2">
                <h4 className="text-lg font-semibold">Tecnologias</h4>
              </div>
              <div>
                <h4 className="mb-2">Exemplo</h4>
                <pre className="bg-zinc-900 flex items-center justify-left p-4 mb-2 border border-none rounded">
                  <code>
                    {
                      '{\n  "backend": ["Django"], \n  "frontend": ["React", "TailwindCSS"]\n}'
                    }
                  </code>
                </pre>
              </div>
              <input
                type="text"
                id="technologies"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="user"
                className="block text-lg font-semibold mb-2"
              >
                Usuário
              </label>
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
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-zinc-800 text-white px-6 py-3 rounded-md hover:bg-zinc-700"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
