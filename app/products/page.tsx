'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Liste des Produits</h1>
      {products.map((p: any) => (
        <div key={p.id} className="border p-4 rounded mb-2">
          <h2 className="text-lg font-semibold">{p.name}</h2>
          <p>{p.description}</p>
          <p className="text-sm text-gray-500">Ajouté par : {p.user?.name || 'Inconnu'}</p>
          <Image src={p.user?.imageLocal} width={100} height={100} alt={'image'}/>
        </div>
      ))}
    </div>
  );
}
