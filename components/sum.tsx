'use client';

import { useEffect, useState } from 'react';
interface ProfileImageProps {
  userId: string | any; 
}
const Pagesum: React.FC<ProfileImageProps> = ({ userId }) => {
  const [sum, setSum] = useState<number | null>(null);

  useEffect(() => {
    const fetchSum = async () => {
      const res = await fetch(`/api/sum/${userId}`);
      const data = await res.json();
      setSum(data.sum);
    };

    fetchSum();
  }, []);

  return (
    <>
      {sum }
    </>
  );
}

export default Pagesum


/*'use client';

import { useEffect, useState } from 'react';

export default function Pagesum() {
  const [sum, setSum] = useState<number | null>(null);

  useEffect(() => {
    const fetchSum = async () => {
      const res = await fetch('/api/sum');
      const data = await res.json();
      setSum(data.sum);
    };

    fetchSum();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4 text-lg">
        Somme des IDs : {sum !== null ? sum : 'Chargement...'}
      </p>
    </div>
  );
}*/
