'use client';

import Navbar from '@/components/navbar';
import api from '@/services/api'; // Importando a função getUsers
import { UserPlus, UserRoundCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function User() {
  const [users, setUsers] = useState<any[]>([]); // Inicializando users com um array vazio
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Buscar usuários da API ao montar o componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users'); // Chama o endpoint de usuários
        // Verifique se 'response.data.users' existe
        if (response.data && response.data.users) {
          setUsers(response.data.users); // Atualiza o estado com a lista de usuários
        } else {
          setError('Nenhum usuário encontrado');
        }
      } catch {
        setError('Erro ao carregar os usuários'); // Atualiza o estado de erro
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchUsers();
  }, []);

  // Função para alternar o estado do botão "Seguir"
  const toggleFollow = () => {
    setIsFollowing((prevState) => {
      const newState = !prevState;
      localStorage.setItem('isFollowing', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white mt-24">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Lista de Usuários</h1>
            <Link href="/usuario/criar">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Criar Usuário
              </button>
            </Link>
          </div>

          {loading && (
            <div className="text-center text-zinc-400">Carregando...</div>
          )}

          {error && (
            <div className="bg-red-600 text-white p-4 mb-6 rounded-lg">
              {error}
            </div>
          )}

          {/* Exibir lista de usuários */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-zinc-700 transition"
                >
                  {/* Avatar do Usuário */}
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src={user.avatar || '/default-avatar.png'}
                      alt={user.fullName}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-200">
                        {user.fullName}
                      </h3>
                      <p className="text-zinc-400">@{user.username}</p>
                      <p className="text-zinc-400">{user.typename}</p>
                    </div>
                  </div>

                  {/* Botão Seguir */}
                  <button
                    className={`flex items-center px-4 py-2 rounded-lg mb-4 transition ${
                      isFollowing ? 'bg-green-700' : 'bg-zinc-700'
                    }`}
                    onClick={toggleFollow}
                  >
                    {isFollowing ? (
                      <div className="flex items-center text-sm">
                        <UserRoundCheck className="w-5 h-5 text-zinc-200 mr-2" />
                        Seguindo
                      </div>
                    ) : (
                      <div className="flex items-center text-sm">
                        <UserPlus className="w-5 h-5 text-zinc-200 mr-2" />
                        Seguir
                      </div>
                    )}
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-zinc-400">
                Nenhum usuário encontrado.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
