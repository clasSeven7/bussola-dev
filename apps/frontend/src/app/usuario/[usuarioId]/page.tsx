'use client';

import Navbar from '@/components/navbar';
import {
  Heart,
  PenTool,
  Settings,
  ShoppingCart,
  UserPlus,
  UserRoundCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usuario } from '../../lib/dataUser';

export default function User() {
  // Estado para o botão "Seguir"
  const [isFollowing, setIsFollowing] = useState(false);

  // Recuperar estado do LocalStorage ao montar o componente
  useEffect(() => {
    const storedState = localStorage.getItem('isFollowing');
    if (storedState) {
      setIsFollowing(JSON.parse(storedState));
    }
  }, []);

  // Função para alternar o estado
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Image
                src={usuario.users[0].avatar}
                alt="Avatar"
                width={100}
                height={100}
                className="rounded-full object-cover border-2 border-zinc-800"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {usuario.users[0].fullName}
                </h1>
                <p className="text-zinc-400 mb-1">
                  @{usuario.users[0].username}
                </p>
                <p className="text-zinc-400 mb-1">
                  {usuario.users[0].typename}
                </p>
              </div>
            </div>
            <div className="">
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
          </div>

          <div>
            <h2 className="text-2xl font-semibold mt-8 mb-6">Bio</h2>
            <p className="text-zinc-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              fugit voluptas incidunt fugiat numquam nobis ipsum nesciunt eius,
              esse laboriosam velit, nemo vero natus molestiae aliquid
              necessitatibus assumenda dolore quod.
            </p>
          </div>

          <Link
            className="flex items-center justify-center text-center bg-zinc-700 px-4 py-2 rounded-lg mt-4"
            href={'usuario/editar'}
          >
            <Settings className="w-6 h-6 text-zinc-200 mr-2" />
            Configurações
          </Link>

          <h2 className=" flex items-center text-2xl font-semibold mt-8 mb-6">
            <Heart className="w-6 h-6 text-zinc-200 mr-2" />
            Projetos Favoritos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {usuario.projects.map((project) => {
              const Icon =
                project.icon === 'shopping-cart' ? ShoppingCart : PenTool;
              return (
                <div
                  key={project.id}
                  className="bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-zinc-700 transition"
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    width={400}
                    height={200}
                    className="rounded-md"
                  />
                  <div className="mt-4">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6 text-zinc-400" />
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                    </div>
                    <p className="text-zinc-300 mt-2">{project.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
