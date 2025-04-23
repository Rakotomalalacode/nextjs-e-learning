'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LuImagePlus } from 'react-icons/lu';

interface ProfileImageProps {
  userId: string | any; 
  initialImageUrl?: string; 
}

const UploadImage: React.FC<ProfileImageProps> = ({ userId, initialImageUrl }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(initialImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      setUploadError('Veuillez sélectionner une image.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('userId', userId);

      const response = await fetch('/api/profile/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image de profil mise à jour avec succès:', data);
        setPreviewImageUrl(data.imageUrl); 
        setSelectedImage(null);
        router.refresh(); 
      } else {
        const errorData = await response.json();
        console.error('Error uploading image:', errorData);
        setUploadError(errorData?.message || 'Erreur lors du téléversement de l\'image.');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setUploadError('Une erreur s\'est produite lors du téléversement.');
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="p-4 border-t border-dash flex flex-col items-center">
        <div
          onClick={handleButtonClick}
          className="relative w-full h-52 rounded shadow-md cursor-pointer overflow-hidden border border-dash flex items-center justify-center bg-darkwhite hover:bg-darkwhite/10"
        >
          {previewImageUrl ? (
            <img src={previewImageUrl} alt="Aperçu du profil" className="object-cover w-full h-full" />
          ) : (
            <div className='flex flex-col items-center gap-3'>
              <LuImagePlus size={50} className='text-gray-600' />
              <p className='text-sm'>Clique pour ajouter une image</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          id="profileImageInput"
          onChange={handleFileChange}
        />
      </div>
      <button
        onClick={handleUploadImage}
        disabled={uploading || !selectedImage}
        className={`bg-oranground text-white font-bold  p-4 rounded-b w-full focus:outline-none focus:shadow-outline ${uploading || !selectedImage ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        {uploading ? 'Téléversement...' : 'Téléverser l\'image'}
      </button>
      {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
    </div>
  );
};

export default UploadImage;