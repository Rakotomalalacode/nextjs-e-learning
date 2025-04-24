"use client"

import React, { useState } from 'react';
import { MenuItem } from '@/interface/MenuItem';
import { TbLayoutDashboard, TbLayoutDashboardFilled } from 'react-icons/tb';
import Loading from './Loading';
import AddProductForm from './AddProductForm';
import { PiUploadFill, PiUploadLight } from 'react-icons/pi';
import Pagesum from './sum';
import { useSession } from 'next-auth/react';

interface DescriptionProps {
    description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
    return (
        <div className=" h-full overflow-auto overflow-y-auto max-h-[410px]">
                {description}
        </div>
    );
};

export const menuItems: MenuItem[] = [
    { id: 'item1', labelOne: <PiUploadFill size={26} />, labelTow: <PiUploadLight size={26} />, name: 'Ajoute un nouveau cours', description: <AddProductForm /> },
    { id: 'item2', labelOne: <TbLayoutDashboardFilled size={26} />, labelTow: <TbLayoutDashboard size={26} />, name: 'Modifier un nouveau cours.', description: 'Ceci est la description de l\'article 1.' },
];

const Addcous = () => {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const { data: session, status } = useSession();
    const handleItemClick = (item: MenuItem) => {
        setSelectedItem(item);
    };
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col-reverse lg:flex-row justify-around gap-4 xl:gap-3'>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`rounded p-6 border border-dash flex flex-row  items-center gap-6 py-8 ${selectedItem?.id === item.id ? 'bg-darkwhite border-none' : ''
                            }`}
                        onClick={() => handleItemClick(item)}
                    >

                        {
                            selectedItem?.id === item.id ? <div className='text-oranground'>{item.labelOne}</div> : <div>{item.labelTow}</div>
                        }
                        <p className={`text-lg font-major ${selectedItem?.id == item.id ? 'text-oranground' : ''}`}>{item.name}</p>
                    </button>
                ))}
                <div className='rounded p-6 bg-darkwhite flex flex-row items-center gap-6 py-8 font-major'>
                    <h1 className='text-oranground'>Totale de votre cours</h1>
                    <div className='bg-oranground/20 w-10 h-10 flex justify-center text-center items-center rounded-full'><p><Pagesum userId={session?.user?.id} /></p></div>
                </div>
            </div>
            <div className="flex-1">
                {selectedItem && <Description description={selectedItem.description} />}
                {!selectedItem && (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default Addcous
