import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategories, setTotalCategories] = useState([0]);
  const navigate = useNavigate();

  const imagesRoute = process.env.REACT_APP_API_HOST + ':' + process.env.REACT_APP_API_PORT + '/uploads';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/categories/summary?page=${currentPage}&searchTerm=${searchTerm}`);
        setCategories(response.data.categories);
        setTotalPages(response.data.totalPages);
        setTotalCategories(response.data.totalCategories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [currentPage, searchTerm]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/content/${categoryId}`);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Categorías</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 mr-2 flex-1"
        />
        <Button type="button" onClick={handleSearch}>
          Buscar
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleCategoryClick(category._id)}
          >
            <div className="relative h-48">
              <img
                  src={`${imagesRoute}/${category.image}`}
                  alt={category.name}
                  className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 p-2">
                <h3 className="text-white font-bold">{category.name}</h3>
                <p className="text-gray-300 text-sm">Total de Contenidos: {category.totalContents}</p>
              </div>
            </div>
            <div className="p-4 flex justify-between">
              <div>
                <p className="text-gray-500 text-sm">Imágenes: {category.contentTypes.image}</p>
                <p className="text-gray-500 text-sm">Videos: {category.contentTypes.video}</p>
                <p className="text-gray-500 text-sm">Texto: {category.contentTypes.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
          <p>
            Mostrando {(currentPage - 1) * 12 + 1} - { (currentPage - 1) * 12 + categories.length }
            {} de {totalCategories} categorías
          </p>
          <div>
            {currentPage > 1 && (
              <Button
                type="button"
                onClick={() => setCurrentPage(currentPage - 1)}
                className="mr-2"
              >
                Anterior
              </Button>
            )}
            {currentPage < totalPages && (
              <Button
                type="button"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </Button>
            )}
          </div>
        </div>
    </div>
  );
};

export default HomePage;
