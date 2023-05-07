import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Dog } from '../../interfaces/dog';
import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import styles from '../styles/index.module.css';

const PAGE_SIZE = 10; // Quantidade de itens por página

const IndexPage: React.FC = () => {
  const [dogsList, setDogsList] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Define a lista de cães a ser exibida na página atual
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentDogsList = dogsList.slice(startIndex, endIndex);

  // Define o número total de páginas
  const totalPages = Math.ceil(dogsList.length / PAGE_SIZE);

  // Define as funções de navegação de página
  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function handlePreviousPage() {
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>LISTA DE CÃES</h1>
      <ul className={styles.list}>
        {currentDogsList.map((dog, index) => (
          <li key={index} className={styles.listItem}>
            <Link href={`/dog/${dog.name}`} id="link" passHref>
              <button className={styles.button}>detalhe</button>
            </Link>
            <strong className={styles.dogName}>Nome da Raça:</strong> {dog.name}
          </li>
        ))}
      </ul>
      <Center>
        <Stack direction="row" mt="4" spacing="4">
          <Box>
            <Button
              colorScheme="blue"
              isDisabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Anterior
            </Button>
          </Box>
          <Box>
            <Text fontSize="lg">
              Página {currentPage} de {totalPages}
            </Text>
          </Box>
          <Box>
            <Button
              colorScheme="blue"
              isDisabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Próxima
            </Button>
          </Box>
        </Stack>
      </Center>
    </div>
  );
};

export default IndexPage;
