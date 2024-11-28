import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirecionar para a página de login se não estiver autenticado
      router.push('/login');
    }
  }, [router]);
};

export default useAuth;
