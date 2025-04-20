"use client"

import React, { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { BsFileEarmarkPdf, BsFileEarmarkPdfFill } from 'react-icons/bs';
import { FaRegStickyNote } from 'react-icons/fa';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoLogOutOutline, IoVideocam, IoVideocamOutline } from 'react-icons/io5';
import ThemeToggle from '../ThemeToggle';
import { TbLayoutDashboard, TbLayoutDashboardFilled } from 'react-icons/tb';
import Produitview from '@/app/view/produitview/page';
import BarDeRechercher from '../BarDeRechercher';
import Image from 'next/image';
import LogoMini from '@/public/images/eduvibemin.png'
interface MenuItem {
  id: string;
  labelOne: any;
  labelTow: any;
  name: string;
  description: any;
}


const menuItems: MenuItem[] = [
  { id: 'item1', labelOne: <GoHomeFill size={26} />, labelTow: <GoHome size={26} />, name: 'Acceil', description: <Produitview /> },
  { id: 'item2', labelOne: <TbLayoutDashboardFilled size={26} />, labelTow: <TbLayoutDashboard size={26} />, name: 'Dash', description: 'Ceci est la description de l\'article 1.' },
  { id: 'item3', labelOne: <IoVideocam size={26} />, labelTow: <IoVideocamOutline size={26} />, name: 'Cours', description: 'Détails sur le Produit A.' },
  { id: 'item4', labelOne: <BsFileEarmarkPdfFill size={26} />, labelTow: <BsFileEarmarkPdf size={26} />, name: 'Livres', description: 'Informations concernant le Service X.' },
  { id: 'item5', labelOne: <FaRegStickyNote size={26} />, labelTow: <FaRegStickyNote size={26} />, name: 'Note', description: 'Quelques mots sur notre entreprise.' },
];

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className=" h-full overflow-auto overflow-y-scroll max-h-screen">
      <div className='sticky top-0 bg-background p-4 border-b border-gray-300'>
        <BarDeRechercher />
      </div>
      <div className='border-l border-gray-300 p-4'>
      {description}
      </div>
    </div>
  );
};

const DashStudent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {

    if (menuItems.length > 0) {
      setSelectedItem(menuItems[0]);
    }
  }, []);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };
  return (
    <div className="flex flex-row">
      <div className="h-screen w-[72px] flex flex-col items-center text-center px-1 justify-between py-3">
        <div className='flex flex-col space-y-3 items-center'>
        <Image 
        src={LogoMini} 
        alt={'LogoMini'}
        width={500}
        height={500}
        className='w-[50px] h-[50px] rounded'/>
        <div>
          {menuItems.map((item) => (
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
            kjkj
          </div>
        )}
      </div>
    </div>
  );
}

export default DashStudent