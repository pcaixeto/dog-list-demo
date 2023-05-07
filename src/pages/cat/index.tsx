import React, { useEffect, useState } from 'react';
import { Cat } from '../../interfaces/cat';

interface Pagination {
  currentPage: number;
  totalPages: number;
}

const CatListPage: React.FC = () => {
  const [catsList, setCatsList] = useState<Cat[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, totalPages: 1 });

  async function fetchCatsList(page: number) {
    try {
      const response = await fetch(`https://api.petfinder.com/v2/animals?type=cat&page=${page}`, {
        headers: {
          Authorization: `Bearer 5oNHx4IHF3GxjpgElqqd7KWvz3Ukj1wsL1d75Qf7mN6ONEwVGl`
        }
      });
      const data = await response.json();
      const cats = data.animals.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        breed: cat.breeds.primary,
        age: cat.age,
        imageUrl: cat.photos.length > 0 ? cat.photos[0].medium : ''
      }));
      const totalPages = data.pagination.total_pages;
      setCatsList(cats);
      setPagination({ currentPage: page, totalPages });
    } catch (error) {
      console.error('Erro ao buscar lista de gatos:', error);
    }
  }

  useEffect(() => {
    fetchCatsList(1);
  }, []);

  return (
    <div>
      <h1>Lista de Gatos</h1>
      <ul>
        {catsList.map(cat => (
          <li key={cat.id}>
            <img src={cat.imageUrl} alt={cat.name} />
            <div>
              <h2>{cat.name}</h2>
              <p>Raça: {cat.breed}</p>
              <p>Idade: {cat.age}</p>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => fetchCatsList(pagination.currentPage - 1)} disabled={pagination.currentPage === 1}>Anterior</button>
        <span>Página {pagination.currentPage} de {pagination.totalPages}</span>
        <button onClick={() => fetchCatsList(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages}>Próxima</button>
      </div>
    </div>
  );
};

export default CatListPage;
