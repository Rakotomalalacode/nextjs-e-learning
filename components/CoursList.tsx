'use client';

import { useEffect, useState } from 'react';
import Loading from './Loading';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  tag: String;
  price: number | string;
  thumbnailUrl : string | any;
}

export default function CoursList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/users/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  
  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mes Produits</h1>
      <ul className="space-y-2">
        {products.map(product => (
          <li key={product.id} className="p-4 border rounded-md">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p>{product.id}</p>
            <Image src={product.thumbnailUrl} width={200} height={200} alt={'thumbnailUrl'}/>
            <p className="text-xs text-gray-400">Ajouté le {new Date(product.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
