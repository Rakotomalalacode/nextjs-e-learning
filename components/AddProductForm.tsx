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
      <div className="grid lg:grid-cols-2 gap-6">
        {/* --- Colonne fichiers --- */}
        <div className="flex flex-col gap-6">
          {/* Main ZIP */}
          <div>
            <label
              htmlFor="maincours"
              className="block text-xl font-medium mb-2"
            >
              Fichier Principal du Cours (ZIP du dossier)
            </label>
            <div
              className="border-2 border-dashed border-oranground rounded-lg h-48 flex items-center justify-center cursor-pointer bg-darkwhite hover:bg-orange-50 transition"
              onClick={() => fileInputRefMain.current?.click()}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="bg-oranground/20 p-4 rounded-md">
                  <FiUpload className="text-3xl text-gray-700" />
                </div>
                <p className="text-sm text-gray-600">
                  Clique pour ajouter un dossier ZIP
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

          {/* PDF Intro */}
        {/* --- Fichier d’introduction (PDF) --- */}
<div>
  <label className="block text-xl font-medium mb-2">
    Fichier d’Introduction (PDF, etc.)
  </label>

  {/* On utilise un <label> lié à l’input pour que tout le container soit cliquable */}
  <label
    htmlFor="intocours"
    className="border-2 border-dashed border-oranground rounded-lg h-20 flex items-center px-4 cursor-pointer bg-darkwhite hover:bg-orange-50 transition"
  >
    <FiUpload className="text-2xl text-gray-700 mr-3" />
    <span className="text-sm text-gray-600">
      {intocoursFile ? intocoursFile.name : 'Clique pour ajouter le PDF'}
    </span>
    {/* input caché */}
    <input
      id="intocours"
      type="file"
      accept=".pdf"
      className="hidden"
      onChange={handleFileChange(setIntocoursFile)}
    />
  </label>
</div>


          {/* Thumbnail */}
          <div>
            <label
              htmlFor="thumcours"
              className="block text-xl font-medium mb-2"
            >
              Miniature du Cours (Image, PDF)
            </label>
            <div
              className="border-2 border-dashed border-oranground rounded-lg h-20 flex items-center justify-start px-4 cursor-pointer bg-darkwhite hover:bg-orange-50 transition"
              onClick={() => fileInputRefThumb.current?.click()}
            >
              <div className="flex items-center gap-3">
                <div className="bg-oranground/20 p-3 rounded-md">
                  <FiUpload className="text-2xl text-gray-700" />
                </div>
                <p className="text-sm text-gray-600">
                  Clique pour ajouter le PDF
                </p>
              </div>
              <input
                ref={fileInputRefThumb}
                id="thumcours"
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileChange(setThumcoursFile, true)}
              />
            </div>
            {previewImageUrl && (
              <img
                src={previewImageUrl}
                alt="Aperçu miniature"
                className="mt-2 w-full h-32 object-cover rounded-md shadow-sm"
              />
            )}
          </div>
        </div>

        {/* --- Colonne texte --- */}
        <div className="flex flex-col gap-4">
          <label className="text-xl font-medium">Titre du cours</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="text-xl font-medium">Description</label>
          <textarea
            className="textarea textarea-bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />

          <label className="text-xl font-medium">Catégorie</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={tagcours}
            onChange={(e) => setTagcours(e.target.value)}
          />

          <label className="text-xl font-medium">Prix (€)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={prixcours}
            onChange={(e) => setPrixcours(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
      >
        <FiUpload className="text-xl" />
        Ajouter le cours
      </button>

      {message && (
        <p className="text-center text-lg font-semibold mt-4 text-green-600">
          {message}
        </p>
      )}
    </form>
  );
};

export default AddProductForm;