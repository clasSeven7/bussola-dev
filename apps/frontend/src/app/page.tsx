import Link from 'next/link';
import Navbar from './components/navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <h1 className="text-zinc-200 text-4xl">Dashbord</h1>
        <div className="bg-gray-400 w-10 h-8">asa</div>
        <Link href="/login" className="bg-zinc-300">
          Login
        </Link>
      </main>
    </>
  );
}
