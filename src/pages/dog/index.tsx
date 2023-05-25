import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Dog } from '../../interfaces/dog';
import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import styles from '../styles/index.module.css';

const PAGE_SIZE = 10; // Quantidade de itens por página

const IndexPage: React.FC = () => {
  const [dogsList, setDogsList] = useState<Dog[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Define o estado da página atual

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
  const startIndex = (currentPage - 1) * PAGE_SIZE; // Define o estado da página atual
  const endIndex = startIndex + PAGE_SIZE; // Define o índice do último item a ser exibido na página atual
  const currentDogsList = dogsList.slice(startIndex, endIndex); // Define o índice do último item a ser exibido na página atual

  // Define o número total de páginas
  const totalPages = Math.ceil(dogsList.length / PAGE_SIZE); 

  // Define as funções de navegação de página
  function handleNextPage() {
    setCurrentPage(currentPage + 1); // Incrementa o número da página atual
    //teste
  }

  function handlePreviousPage() {
    setCurrentPage(currentPage - 1); // Decrementa o número da página atual
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All type of dogs!</h1>
      <ul className={styles.list}>
        {currentDogsList.map((dog, index) => (
          <li key={index} className={styles.listItem}>
            <Link href={`/dog/${dog.name}`} id="link" passHref>
              <button className={styles.button}>Show me!</button>
            </Link>
            <strong className={styles.dogName}>Show me the {dog.name}! </strong>
          </li>
        ))}
      </ul>
      <Center>
        <Stack direction="row" mt="4" spacing="4">
          <Box>
            <Button
              colorScheme="blue"
              isDisabled={currentPage === 1} // Define se o botão "Anterior" deve estar desabilitado quando a página atual for a primeira página
              onClick={handlePreviousPage}  // Define a função a ser chamada quando o botão "Anterior" for clicado
            >
              Show Less
            </Button>
          </Box>
          <Box>
            <Text fontSize="lg"> 
              Page {currentPage} of {totalPages} 
            </Text>
          </Box>
          <Box>
            <Button
              colorScheme="blue"
              isDisabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Show More
            </Button>
          </Box>
        </Stack>
      </Center>
    </div>
  );
};

export default IndexPage;
