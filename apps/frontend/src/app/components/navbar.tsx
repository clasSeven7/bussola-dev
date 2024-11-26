'use client';

import { File, Folder, House, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchCommand } from './search';

export default function Navbar() {
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
              href="projetos/"
              className="text-zinc-200 flex items-center justify-center text-sm text-center ml-5"
            >
              <Folder width={18} className="mr-1" aria-hidden="true" />
              Projetos
            </Link>
            <Link
              href="portifolio/"
              className="text-zinc-200 flex items-center justify-center text-sm text-center ml-5"
            >
              <File width={18} className="mr-1" aria-hidden="true" />
              Portifolio
            </Link>
            <Link
              href="dashboard/"
              className="text-zinc-200 flex items-center justify-center text-sm text-center ml-5"
            >
              <LayoutDashboard width={18} className="text-zinc-200 mr-1" />
              Dashboard
            </Link>
          </div>

          <div className="flex items-center justify-end text-center align-center">
            <div className="flex items-center justify-start text-zinc-200 border-zinc-200">
              <SearchCommand />
            </div>
            <Link
              href="usuario/"
              className="text-zinc-200 flex items-center justify-center text-sm text-center ml-5"
            >
              <Image
                src="https://github.com/saulojustiniano1.png"
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full border-2 border-zinc-800"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
