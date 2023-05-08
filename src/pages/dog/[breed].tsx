import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Dog } from '../../interfaces/dog';
import styles from '../styles/index.module.css';

interface DogDetailsProps {
  dog: Dog;
}

const DogDetails: React.FC<DogDetailsProps> = ({ dog }) => {
  return (
    <div>
      <h1>{dog.name}</h1>
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
        setDog({ name: breed as string, breed: breed as string, imageUrl: data.message });
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

  return (
    <div className={styles.container}>
      <DogDetails dog={dog} />
      <div className={styles.buttonsContainer}>
        <a href="/" className={styles.link}>
          <div className={styles.button}>
            Voltar para a lista
            <span className={styles.buttonDescription}>Clique aqui para voltar para a lista de raças</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default DogDetailsPage;
