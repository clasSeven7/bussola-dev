'use client';

import {
  File,
  Folder,
  House,
  LayoutDashboard,
  LogOut,
  TreeDeciduous,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchCommand } from './search';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Remover o token e o nome do usuário do localStorage
    localStorage.removeItem('token');
    // Redirecionar para a página de login
    router.push('/login');
  };

  return (
    <nav className="w-full fixed top-0 left-0 py-5 z-10 border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-[1500px] mx-auto px-5">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Link
              href="/"
              className="flex justify-center text-center border-r-2 border-zinc-800"
            >
              <Image
                className="mr-5"
                src="/logo.png"
                alt="logo de bússola"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href="/"
              className="text-zinc-200 flex items-center justify-center text-sm text-center ml-5"
            >
              <House width={18} className="mr-1" aria-hidden="true" />
              Início
            </Link>
            <Link
              href="/projetos/"
              className="text-zinc-200 flex items-center justify-center text-sm text-center ml-5"
            >
              <Folder width={18} className="mr-1" aria-hidden="true" />
              Projetos
            </Link>
            <Link
              href="/portifolio/"
              className="text-zinc-200 flex items-center justify-center text-sm text-center ml-5"
            >
              <File width={18} className="mr-1" aria-hidden="true" />
              Portifolio
            </Link>
            <Link
              href="/dashboard/"
              className="text-zinc-200 flex items-center justify-center text-sm text-center ml-5"
            >
              <LayoutDashboard width={18} className="text-zinc-200 mr-1" />
              Dashboard
            </Link>
            <Link
              href="/arvore/"
              className="text-zinc-200 flex items-center justify-center text-sm text-center ml-5"
            >
              <TreeDeciduous width={18} className="text-zinc-200 mr-1" />
              Arvore
            </Link>
          </div>

          <div className="flex items-center justify-end text-center align-center">
            <div className="flex items-center justify-start text-zinc-200 border-zinc-200">
              <SearchCommand />
            </div>
            <Link
              href="/usuario/"
              className="text-zinc-200 flex items-center justify-center text-sm text-center ml-5"
            >
              <User
                width={40}
                height={40}
                className="border rounded-full border-zinc-950 bg-zinc-900 hover:bg-zinc-400 hover:text-zinc-900 p-2 mr-1"
                aria-hidden="true"
              />
            </Link>

            {/* Botão de Logout */}
            <button
              onClick={handleLogout}
              className="ml-5 text-zinc-200 flex items-center justify-center text-sm text-center"
            >
              <LogOut width={18} className="mr-1" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
