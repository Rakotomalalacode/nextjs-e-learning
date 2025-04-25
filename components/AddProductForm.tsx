'use client';

import { useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

interface ProfileImageProps {
  initialImageUrl?: string;
}

const AddProductForm: React.FC<ProfileImageProps> = ({ initialImageUrl }) => {
  const [maincoursFile, setMaincoursFile] = useState<File | null>(null);
  const [intocoursFile, setIntocoursFile] = useState<File | null>(null);
  const [thumcoursFile, setThumcoursFile] = useState<File | null>(null);
  const [tagcours, setTagcours] = useState('');
  const [prixcours, setPrixcours] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    initialImageUrl || null
  );

  const fileInputRefMain = useRef<HTMLInputElement>(null);
  const fileInputRefIntro = useRef<HTMLInputElement>(null);
  const fileInputRefThumb = useRef<HTMLInputElement>(null);

  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>, preview = false) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          setter(file);
          if (preview) {
            setPreviewImageUrl(URL.createObjectURL(file));
          }
        }
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (maincoursFile) formData.append('maincours', maincoursFile);
    if (intocoursFile) formData.append('intocours', intocoursFile);
    if (thumcoursFile) formData.append('thumcours', thumcoursFile);
    formData.append('tagcours', tagcours);
    formData.append('prixcours', prixcours);
    formData.append('name', name);
    formData.append('description', description);

    const res = await fetch('/api/products', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Cours ajouté avec succès !');
      setName('');
      setDescription('');
      setMaincoursFile(null);
      setIntocoursFile(null);
      setThumcoursFile(null);
      setTagcours('');
      setPrixcours('');
      setPreviewImageUrl(null);
    } else {
      setMessage(data.error || 'Erreur lors de l’ajout du cours.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className=" gap-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className='flex flex-col gap-4 p-4'>
            <label
              htmlFor="maincours"
              className="block text-xl"
            >
              Fichier Principal du Cours (ZIP du dossier)
            </label>
            <div
              className="border border-dashed border-oranground rounded h-[235px] flex items-center justify-center cursor-pointer bg-darkwhite transition"
              onClick={() => fileInputRefMain.current?.click()}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="bg-oranground/20 p-4 rounded">
                  <FiUpload className="text-3xl text-principal" />
                </div>
                <p className="text-sm text-principal">
                  {maincoursFile ? maincoursFile.name : 'Clique pour ajouter un dossier ZIP'}
                </p>
              </div>
              <input
                ref={fileInputRefMain}
                id="maincours"
                type="file"
                accept=".zip"
                className="hidden"
                onChange={handleFileChange(setMaincoursFile)}
              />
            </div>
          </div>
          <div>
            <div className='flex flex-col gap-4 p-4'>
              <label className="block text-xl">
                Fichier d'Introduction (PDF, etc.)
              </label>
              <label
                htmlFor="intocours"
                className="border p-4 gap-4 border-dashed border-oranground rounded h-20 flex items-center px-4 cursor-pointer bg-darkwhite transition"
              ><div className='bg-oranground/20 p-3 rounded'>
                  <FiUpload className="text-2xl text-principal" />
                </div>
                <span className="text-sm text-principal">
                  {intocoursFile ? intocoursFile.name : 'Clique pour ajouter le PDF'}
                </span>
                <input
                  id="intocours"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange(setIntocoursFile)}
                />
              </label>
            </div>
            <div className='flex flex-col gap-4 p-4'>
              <label
                htmlFor="thumcours"
                className="block text-xl"
              >
                {/*Miniature du Cours (Image, PDF)*/} Photo de couverture du Cours (Image)
              </label>
              <div
                className="border border-dashed border-oranground rounded h-20 flex items-center justify-start px-4 cursor-pointer bg-darkwhite transition"
                onClick={() => fileInputRefThumb.current?.click()}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-oranground/20 p-3 rounded">
                    <FiUpload className="text-2xl text-principal" />
                  </div>
                  <p className="text-sm text-principal">
                    {thumcoursFile ? thumcoursFile.name : 'Clique pour ajouter le PDF'}
                  </p>
                </div>
                <input
                  ref={fileInputRefThumb}
                  id="thumcours"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange(setThumcoursFile, true)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className='p-4 flex flex-col gap-4'>
            <label className="text-xl">Description du cours</label>
            <textarea
              className="textarea textarea-bordered border border-dashed rounded border-oranground bg-darkwhite focus:outline-none p-3 h-[252px]"
              value={description}
              placeholder='Description de votre cours'
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>
          <div className='p-4 flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
              <label className="text-xl">Titre du cours</label>
              <input
                type="text"
                className="input input-bordered border border-dashed border-oranground w-full rounded h-11 focus:outline-none bg-darkwhite p-3"
                value={name}
                placeholder='Titre de votre cours'
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col gap-4'>
              <label className="text-xl">Catégorie</label>
              <input
                type="text"
                className="input input-bordered border border-dashed border-oranground w-full rounded h-11 focus:outline-none bg-darkwhite p-3"
                value={tagcours}
                placeholder='Catégorie de votre cours'
                onChange={(e) => setTagcours(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <label className="text-xl">Prix du cours (en Ar)</label>
              <input
                type="number"
                className="input input-bordered border border-dashed border-oranground w-full rounded h-11 focus:outline-none bg-darkwhite p-3"
                value={prixcours}
                placeholder='Prix de votre cours'
                onChange={(e) => setPrixcours(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition"
            >
              <FiUpload className="text-xl" />
              Ajouter le cours
            </button>
          </div>
        </div>
        <div className='p-4'>
          {message && (
            <p className="text-center text-lg mt-4 text-green-600">
              {message}
            </p>
          )}
          <p>helllo</p>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;

/*{previewImageUrl && (
                <img
                  src={previewImageUrl}
                  alt="Aperçu miniature"
                  className="mt-2 w-full h-32 object-cover rounded-md shadow-sm"
                />
              )}*/