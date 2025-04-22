"use client"

import React, { useState, useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import ThemeToggle from '../ThemeToggle';
import BarDeRechercher from '../BarDeRechercher';
import Image from 'next/image';
import LogoMini from '@/public/images/eduvibemin.png'
import Loading from '../Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoLogOutOutline } from 'react-icons/io5';
import { menuItemsTeacher } from '@/constant/menuItems';
import { MenuItem } from '@/interface/MenuItem';
import { User } from "@/interface/DashboarUse";
import HoursMalalafomba from '../HoursMalalafomba';
import { LiaUserEditSolid } from 'react-icons/lia';
import EditProfil from '../EditProfil';
import { HiMiniChevronDown } from 'react-icons/hi2';


interface DescriptionProps {
    description: string;
}

const accordionItems = [
    {
        id: 1,
        title:
            <div className='p-4 flex hover:bg-darkwhite items-center justify-between border-t rounded-b-lg border-gray-200'>
                <p>Edit Profile</p>
                <LiaUserEditSolid size={25} />
            </div>,
        content:
            <div>
                hello
            </div>
    },
]

const Description: React.FC<DescriptionProps> = ({ description }) => {
    const searchParams = useSearchParams();
    const googleId = searchParams.get("U");
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useEffect(() => {
        if (googleId) {
            fetch(`/api/users?U=${googleId}`)
                .then(async (res) => {
                    if (!res.ok) {
                        const text = await res.text();
                        console.error("Erreur serveur :", text);
                        throw new Error("Échec de récupération des données");
                    }
                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => {
                    console.error("Erreur lors de la récupération de l'utilisateur", err);
                    setError("Impossible de charger les données.");
                });
        }
    }, [googleId]);
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className=" h-full overflow-auto overflow-y-scroll max-h-screen">
            <div className='sticky  top-0 bg-background p-4 flex items-center  justify-between border-b border-gray-300'>
                <h1 className='flex gap-2'><HoursMalalafomba /><p className='text-oranground'>{session.user?.name}</p></h1>
                <BarDeRechercher />
                <div ref={popoverRef}>
                    <div
                        onClick={() => setOpen(prev => !prev)}>
                        <Image
                            src={session.user.image || "/images/585e4beacb11b227491c3399.png"}
                            alt="Photo de profil"
                            width={100}
                            height={100}
                            className='w-10 h-10 rounded-full border border-oranground' />
                        <HiMiniChevronDown className='absolute -mt-4 bg-background rounded-full border border-white ml-7' />
                    </div>
                    {open && (
                        <div
                            className="absolute top-full right-2 z-20 mt-2 bg-background border border-gray-200 rounded shadow-lg w-64"
                        >
                            <div className='p-4 flex gap-4 items-center hover:bg-darkwhite rounded-t-lg'>
                                <Image
                                    src={session.user.image || "/images/585e4beacb11b227491c3399.png"}
                                    alt="Photo de profil"
                                    width={100}
                                    height={100}
                                    className='w-10 h-10 rounded-full' />
                                <div>
                                    <p className='text-xl font-medium'>{session.user?.name}</p>
                                    <p className='-mt-1.5 text-[14px]'>{session.user?.role}</p>
                                </div>
                            </div>
                            <EditProfil items={accordionItems} />
                        </div>
                    )}
                </div>
            </div>
            <div className='border-l border-gray-300 p-4'>
                {description}
            </div>
        </div>
    );
};

const DashTeacher: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const { status } = useSession();
    const router = useRouter();

    const searchParams = useSearchParams();
    const googleId = searchParams.get("U");

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (googleId) {
            fetch(`/api/users?U=${googleId}`)
                .then(async (res) => {
                    if (!res.ok) {
                        const text = await res.text();
                        console.error("Erreur serveur :", text);
                        throw new Error("Échec de récupération des données");
                    }
                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => {
                    console.error("Erreur lors de la récupération de l'utilisateur", err);
                    setError("Impossible de charger les données.");
                });
        }
    }, [googleId]);

    if (error) return <div className="text-red-500">{error}</div>;



    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        } else if (menuItemsTeacher.length > 0 && !selectedItem) {
            setSelectedItem(menuItemsTeacher[0]);
        }
    }, [status, router, selectedItem]);

    const handleItemClick = (item: MenuItem) => {
        setSelectedItem(item);
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <div className="flex flex-row">
            <div className="h-screen w-[72px] flex flex-col items-center text-center px-1 justify-between py-3">
                <div className='flex flex-col space-y-3 items-center'>
                    <Image
                        src={LogoMini}
                        alt={'LogoMini'}
                        width={500}
                        height={500}
                        className='w-[50px] h-[50px] rounded' />
                    <div>
                        {menuItemsTeacher.map((item) => (
                            <button
                                key={item.id}
                                className={` rounded p-4 gap-1 flex flex-col ${selectedItem?.id === item.id ? 'bg-darkwhite' : ''
                                    }`}
                                onClick={() => handleItemClick(item)}
                            >

                                {
                                    selectedItem?.id === item.id ? <div className='text-oranground'>{item.labelOne}</div> : <div>{item.labelTow}</div>
                                }
                                {
                                    selectedItem?.id === item.id ? '' : <p className='text-[9px]'>{item.name}</p>
                                }
                                {
                                    selectedItem?.id === item.id ? <div className='w-[5px] bg-oranground h-7 -mt-[2px] rounded-2xl absolute -ml-4 '></div> : ''
                                }
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-7'>
                    <ThemeToggle />
                    <button
                        onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                        className='border rounded p-2 bg-red-600 text-white hover:bg-red-600/80'
                    ><IoLogOutOutline size={25} /></button>
                </div>
            </div>

            <div className="flex-1">
                {selectedItem && <Description description={selectedItem.description} />}
                {!selectedItem && (
                    <div className="p-4 border-l border-t rounded-tl-lg border-gray-300 h-full">
                        <Loading />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashTeacher