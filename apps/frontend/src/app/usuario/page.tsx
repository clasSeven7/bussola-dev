import { PenTool, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { usuario } from '../../lib/dataUser';
import Navbar from '../components/navbar';

export default function User() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white mt-10">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center space-x-6">
            {/* Avatar do usuário */}
            <Image
              src={usuario.user.avatar}
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full object-cover border-2 border-zinc-800"
            />
            <div>
              <h1 className="text-3xl font-bold">{usuario.user.fullName}</h1>
              <p className="text-zinc-400">@{usuario.user.username}</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-6">Projetos</h2>

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
