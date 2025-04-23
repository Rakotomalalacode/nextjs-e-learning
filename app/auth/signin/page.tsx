'use client';

import { getProviders, signIn, Provider, useSession } from 'next-auth/react';
import Image from 'next/image';
import GoogleImage from "@/public/images/google-icon-logo.svg";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '@/components/Loading';
import { LoadingSignin } from '@/components/ui/LoadingSignin';
import CryptoJS from "crypto-js";

const ENCRYPTION_ID = "ny_avy_any_tonga_aty_ny_aty_tonga_any"

interface SignInPageProps { }

export default function SignInPage({ }: SignInPageProps) {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProviders = async () => {
      const fetchedProviders = await getProviders();
      setProviders(fetchedProviders);
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role) {
        const cryptGoogleId = CryptoJS.AES.encrypt(
          session.user?.googleId.toString(),
          ENCRYPTION_ID
        ).toString();

        router.push(`/dashboard/${session.user.role}?${cryptGoogleId}&${cryptGoogleId}&U=${session.user.googleId}&${session.user?.email}`);
      } else {
        router.push(`/auth/signin`);
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    return <Loading />;
  }

  if (!providers) {
    return <LoadingSignin />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="w-[90%] md:w-auto lg:p-16 p-10 text-center flex flex-col gap-6 rounded-lg bg-darkwhite">
        <Link href={"/"}>
          <div className="font-major bg-transparent text-white text-center">
            <h1 className="text-5xl text-oranground">eduVibe</h1>
            <p className="text-[12px] text-oranground">"learning your way"</p>
          </div>
        </Link>
        <h1 className="lg:text-3xl text-2xl">Connexion ou Inscription</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className='w-full flex justify-center'>
            <button
              className="flex items-center gap-6 border hover:border-oranground hover:text-oranground border-gray-200 p-4 lg:px-6 rounded-lg"
              onClick={() => signIn(provider.id)}
            >
              <Image
                src={GoogleImage}
                alt={"GoogleImage"}
                width={30}
              />
              <p className="lg:text-xl text-sm">Se connecter avec {provider.name}</p>
            </button>
          </div>
        ))}
        <div className='text-sm max-w-80 m-auto'>
          En continuant, vous acceptez les <Link target="_blank" href={'/conditions-utilisation'} className='text-blue-700 hover:underline'>conditions d'utilisation</Link> d' <span className='text-oranground font-major'>eduVibe</span> et avez lu <Link target="_blank" href={'/politique-de-confidentialite'} className='text-blue-700 hover:underline'>la politique de confidentialité</Link> d' <span className='text-oranground font-major'>eduVibe</span>
        </div>
      </div>
    </div>
  );
}