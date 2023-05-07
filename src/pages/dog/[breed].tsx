import { useRouter } from 'next/router';
import { Dog } from '../../interfaces/dog';
import React, { useEffect, useState } from 'react';

interface DogDetailsProps {
  dog: Dog;
}

const DogDetails: React.FC<DogDetailsProps> = ({ dog }) => {
  return (
    <div>
      <h1>{dog.name}</h1>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <img src={dog.imageUrl} alt={dog.name} />
    </div>
  );
};

const DogDetailsPage: React.FC = () => {
  const router = useRouter();
  const { breed } = router.query;

  const [dog, setDog] = useState<Dog>();

  useEffect(() => {
    async function fetchDog() {
      try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await response.json();
        setDog({ name: breed as string, breed: breed as string, age: 0, imageUrl: data.message });
      } catch (error) {
        console.error(`Erro ao buscar detalhes do cachorro ${breed}:`, error);
      }
    }

    if (breed) {
      fetchDog();
    }
  }, [breed]);

  if (!dog) {
    return <div>Loading...</div>;
  }

  return <DogDetails dog={dog} />;
};

export default DogDetailsPage;
