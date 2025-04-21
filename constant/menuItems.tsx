import { TbLayoutDashboard, TbLayoutDashboardFilled } from 'react-icons/tb';
import Produitview from '@/app/view/produitview/page';
import { BsFileEarmarkPdf, BsFileEarmarkPdfFill } from 'react-icons/bs';
import { FaRegStickyNote } from 'react-icons/fa';
import { GoHome, GoHomeFill } from 'react-icons/go';
import {IoVideocam, IoVideocamOutline } from 'react-icons/io5';
import { MenuItem } from '@/interface/MenuItem';

export const menuItems: MenuItem[] = [
  { id: 'item1', labelOne: <GoHomeFill size={26} />, labelTow: <GoHome size={26} />, name: 'Acceil', description: <Produitview /> },
  { id: 'item2', labelOne: <TbLayoutDashboardFilled size={26} />, labelTow: <TbLayoutDashboard size={26} />, name: 'Dash', description: 'Ceci est la description de l\'article 1.' },
  { id: 'item3', labelOne: <IoVideocam size={26} />, labelTow: <IoVideocamOutline size={26} />, name: 'Cours', description: 'Détails sur le Produit A.' },
  { id: 'item4', labelOne: <BsFileEarmarkPdfFill size={26} />, labelTow: <BsFileEarmarkPdf size={26} />, name: 'Livres', description: 'Informations concernant le Service X.' },
  { id: 'item5', labelOne: <FaRegStickyNote size={26} />, labelTow: <FaRegStickyNote size={26} />, name: 'Note', description: 'Quelques mots sur notre entreprise.' },
];