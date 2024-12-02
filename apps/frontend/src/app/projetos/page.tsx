'use client';

import Navbar from '@/components/navbar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import api from '@/services/api';
import { CirclePlus, Eye, FileText, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Projects() {
  interface Project {
    id: number;
    image: string;
    title: string;
    description: string;
    technologies: { [key: string]: string[] };
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    api
      .get('/projects/')
      .then((response) => setProjects(response.data.results))
      .catch((error) => {
        // console.error('Erro ao buscar projetos:', error);
        if (error.response?.status === 401) {
          alert('Sessão expirada. Faça login novamente.');
          localStorage.removeItem('token');
        }
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-zinc-950 text-white mt-24">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex align-center justify-between p-4">
            <h1 className="text-3xl font-bold mr-10">Meus Projetos</h1>
            <div className="flex justify-end">
              <Link
                href="projetos/criar"
                className="bg-zinc-800 text-white px-4 py-2 rounded-md flex items-center space-x-2"
              >
                <CirclePlus className="w-5 h-5" />
                <span>Adicionar projeto</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-800 p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-zinc-700 transition"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={128}
                  height={128}
                  className="rounded-md w-full h-60 object-cover"
                />
                <Link
                  href={`projetos/${project.id}`}
                  className="flex align-center justify-center text-center text-zinc-200 mt-2"
                >
                  <Eye className="w-5 h-5 text-zinc-200 mr-1" />
                  Visualizar
                </Link>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-zinc-300 mt-2">{project.description}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold">Tecnologias:</h4>
                    <ul className="text-zinc-400 text-sm">
                      {Object.entries(project.technologies).map(
                        ([category, techs]) => (
                          <li key={category} className="mt-2">
                            <span className="font-bold">{category}:</span>
                            <ul className="list-disc ml-5">
                              {techs.map((tech, index) => (
                                <li key={index}>{tech}</li>
                              ))}
                            </ul>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <a href="#" className="text-zinc-400 hover:text-white">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-zinc-400 hover:text-white">
                      <FileText className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-zinc-400 hover:text-white">
                      {/* <ReactLogo className="w-5 h-5" /> */}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={handlePreviousPage}
                  className={currentPage === 1 ? 'disabled' : ''}
                />
              </PaginationItem>
              {[...Array(totalPages).keys()].map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(pageNumber + 1)}
                    className={
                      currentPage === pageNumber + 1 ? 'font-bold' : ''
                    }
                  >
                    {pageNumber + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={handleNextPage}
                  className={currentPage === totalPages ? 'disabled' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
