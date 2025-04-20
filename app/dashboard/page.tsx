"use client"

import Loading from '@/components/Loading';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div>
      <h1>Tableau de bord</h1>
      {session && session.user ? (
        <div>
          <img src={session.user.image} alt="Photo de profil" style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
          <p>Nom: {session.user.name}</p>
          <p>Email: {session.user.email}</p>
          <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>Se déconnecter</button>
        </div>
      ) : (
        <p>Non connecté</p>
      )}
    </div>
  );
}