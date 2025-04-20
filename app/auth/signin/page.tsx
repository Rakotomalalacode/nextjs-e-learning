'use client';

import { getProviders, signIn, Provider } from 'next-auth/react';
import Image from 'next/image';
import GoogleImage from "@/public/images/google-icon-logo.svg"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SignInPageProps { }

export default function SignInPage({ }: SignInPageProps) {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
  const [callbackUrl, setCallbackUrl] = useState<string>('/dashboard');
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const fetchedProviders = await getProviders();
      setProviders(fetchedProviders);
    };

    fetchProviders();

    const searchParams = new URLSearchParams(window.location.search);
    const urlCallbackUrl = searchParams.get('callbackUrl');
    if (urlCallbackUrl) {
      setCallbackUrl(urlCallbackUrl);
    }
  }, []);

  if (!providers) {
    return <div>Chargement des options de connexion...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="w-[90%] lg:w-auto lg:p-16 p-10 text-center flex flex-col gap-6 rounded-lg bg-darkwhite">
        <Link href={"/"}>
          <div className="font-major bg-transparent text-white text-center">
            <h1 className="text-5xl text-oranground">eduVibe</h1>
            <p className="text-[12px] text-oranground">"learning your way"</p>
          </div>
        </Link>
        <h1 className="lg:text-3xl text-2xl">Connexion ou Inscription</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="flex items-center gap-6 border hover:border-oranground hover:text-oranground border-gray-200 p-4 lg:px-6 rounded-lg"
              onClick={() => signIn(provider.id, { callbackUrl })}>
              <Image
                src={GoogleImage}
                alt={"GoogleImage"}
                width={30}
              />
              <p className="lg:text-xl text-sm">Se connecter avec {provider.name}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}