'use client';

import { CirclePlus, Folder, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../../components/navbar';

export default function CreateProject() {
  const router = useRouter();

  // Estados para armazenar os dados do projeto
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [technologies, setTechnologies] = useState([
    { category: '', techs: [''] },
  ]);

  // Função para adicionar nova categoria de tecnologias
  const addCategory = () => {
    setTechnologies([...technologies, { category: '', techs: [''] }]);
  };

  // Função para remover categoria
  const removeCategory = (index: number) => {
    const newTechnologies = [...technologies];
    newTechnologies.splice(index, 1);
    setTechnologies(newTechnologies);
  };

  // Função para salvar o projeto no banco de dados
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      title,
      description,
      image_url: imageUrl,
      technologies,
    };

    // Envio para a API do backend Django
    try {
      const response = await fetch('http://localhost:8000/api/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        // Redireciona após sucesso
        router.push('/projetos');
      } else {
        // Handle error
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
                htmlFor="imageUrl"
                className="block text-lg font-semibold mb-2"
              >
                URL da Imagem
              </label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                // required
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-left text-center  mb-2">
                <h4 className="text-lg font-semibold">Tecnologias</h4>
                <button
                  type="button"
                  onClick={addCategory}
                  className="flex items-center ml-2 text-zinc-400 hover:text-white"
                >
                  <CirclePlus className="w-4 h-4 mr-2" />
                </button>
              </div>
              {technologies.map((category, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      value={category.category}
                      onChange={(e) => {
                        const newTechnologies = [...technologies];
                        newTechnologies[index].category = e.target.value;
                        setTechnologies(newTechnologies);
                      }}
                      placeholder="Categoria"
                      className="w-full p-2 rounded-md bg-zinc-800 text-white border border-zinc-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeCategory(index)}
                      className="ml-2 text-red-500"
                    >
                      <Trash />
                    </button>
                  </div>
                  {category.techs.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => {
                          const newTechnologies = [...technologies];
                          newTechnologies[index].techs[techIndex] =
                            e.target.value;
                          setTechnologies(newTechnologies);
                        }}
                        placeholder="Tecnologia"
                        className="w-full p-2 rounded-md bg-zinc-800 text-white border border-zinc-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeTechnology(index, techIndex)}
                        className="ml-2 text-red-500"
                      >
                        <Trash />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
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
