'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/services/api';
import { AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [icon, setIcon] = useState<string | null>(null); // Mudado para armazenar a URL
  const [typename, setTypename] = useState(''); // Tipo de usuário
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validação do tipo de arquivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError(
          'Formato de ícone inválido. Aceitamos apenas imagens PNG, JPG e JPEG.'
        );
        return;
      }

      // Validação do tamanho do arquivo (máximo 2 MB)
      const maxSize = 2 * 1024 * 1024; // 2 MB
      if (file.size > maxSize) {
        setError('O ícone deve ter no máximo 2 MB.');
        return;
      }

      // Fazendo upload do ícone para um serviço de armazenamento (exemplo: Cloudinary)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_cloudinary_upload_preset'); // Substitua com o seu preset

      try {
        const response = await api.post(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
          formData
        );

        // Armazene a URL do ícone
        setIconPreview(response.data.secure_url); // Exibe a pré-visualização do ícone
        setIcon(response.data.secure_url); // Salve a URL para enviar ao backend
      } catch (error) {
        console.error('Erro ao fazer upload do ícone:', error);
        setError('Erro ao carregar o ícone. Tente novamente.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validação simples
    if (!name || !email || !password || !icon || !typename) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('icon', icon); // Agora estamos enviando a URL
    formData.append('typename', typename);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token não encontrado. Por favor, faça login novamente.');
        return;
      }

      await api.post('/users/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Usuário criado com sucesso!');
      router.push('/projetos');
    } catch (error: any) {
      console.error('Erro ao salvar o projeto:', error);

      if (error.response) {
        alert(
          `Erro: ${error.response.status} - ${
            error.response.data.detail || 'Detalhes não disponíveis.'
          }`
        );
      } else {
        alert('Erro desconhecido ao salvar o usuário.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex justify-center items-center">
      <div className="max-w-md w-full bg-zinc-800 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Criar Usuário</h2>

        {error && (
          <div className="flex items-center bg-red-600 text-white p-2 rounded-lg mb-4">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center bg-green-600 text-white p-2 rounded-lg mb-4">
            <CheckCircle className="w-5 h-5 mr-2" />
            Usuário criado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite o email"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="Digite a senha"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="icon">Ícone</Label>
            {iconPreview && (
              <div className="mb-4 text-center">
                <Image
                  src={iconPreview}
                  alt="Pré-visualização do ícone"
                  className="w-16 h-16 rounded-full mb-2"
                  width={64}
                  height={64}
                />
              </div>
            )}
            <Input id="icon" type="file" onChange={handleIconChange} required />
          </div>

          <div className="mb-4">
            <Label htmlFor="typename">Tipo</Label>
            <select
              id="typename"
              value={typename}
              onChange={(e) => setTypename(e.target.value)}
              className="w-full p-2 rounded-lg bg-zinc-700 text-white"
              required
            >
              <option value="">Selecione o tipo</option>
              <option value="Desenvolvedor">Desenvolvedor</option>
              <option value="Recrutador">Recrutador</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Usuário'}
          </Button>
        </form>
      </div>
    </div>
  );
}
