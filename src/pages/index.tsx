import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Dog } from '../interfaces/dog';

const IndexPage: React.FC = () => {
  const [dogsList, setDogsList] = useState<Dog[]>([]);

  useEffect(() => {
    async function fetchDogsList() {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        const dogs = Object.keys(data.message).map(name => ({ name, breed: '', age: 0, imageUrl: '' }));
        setDogsList(dogs);
      } catch (error) {
        console.error('Erro ao buscar lista de cães:', error);
      }
    }
    fetchDogsList();
  }, []);

  return (
    <div>
      <h1>DOG LIST</h1>
      <ul>
        {dogsList.map((dog, index) => (
          <li key={index}>
            <Link href={`/dog/${dog.name}`} id="link">Detalhe</Link>
            <strong>Name:</strong> {dog.name} | <strong>Breed:</strong> {dog.breed} | <strong>Age:</strong> {dog.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
