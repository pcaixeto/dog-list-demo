import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Dog } from '../../interfaces/dog';
import styles from '../styles/index.module.css';


const IndexPage: React.FC = () => {
  const [dogsList, setDogsList] = useState<Dog[]>([]);

  useEffect(() => {
    async function fetchDogsList() {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        const dogs = Object.keys(data.message).map(name => ({ name, breed: '', imageUrl: '' }));
        setDogsList(dogs);
      } catch (error) {
        console.error('Erro ao buscar lista de cães:', error);
      }
    }
    fetchDogsList();
  }, []);

  const limitedDogsList = dogsList.slice(0, 10); // Limita a lista de cães para as 10 primeiras raças

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>LISTA DE CÃES</h1>
      <ul className={styles.list}>
        {limitedDogsList.map((dog, index) => (
          <li key={index} className={styles.listItem}>
            <Link href={`/dog/${dog.name}`} id="link" passHref>
              <button className={styles.button}>detalhe</button>
            </Link>
            <strong className={styles.dogName}>Nome da Raça:</strong> {dog.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
