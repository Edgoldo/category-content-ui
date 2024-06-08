import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Form from '../components/common/Form';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', image: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategories, setTotalCategories] = useState([0]);
  const { user } = useAuth();

  const imagesRoute = process.env.REACT_APP_API_HOST + ':' + process.env.REACT_APP_API_PORT + '/uploads';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/categories?searchTerm=${searchTerm}&page=${currentPage}`);
        setCategories(response.data.categories);
        setTotalPages(response.data.totalPages);
        setTotalCategories(response.data.totalCategories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [searchTerm, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newCategory.name);
      formData.append('description', newCategory.description);
      if (newCategory.image) {
        formData.append('image', newCategory.image);
      }
      await axios.post('/categories', formData);
      setNewCategory({ name: '', description: '', image: null });
      // Actualizar la lista de categorías
      const response = await axios.get('/categories');
      setCategories(response.data.categories);
      setTotalPages(response.data.totalPages);
      setTotalCategories(response.data.totalCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/categories/${categoryId}`);
      // Actualizar la lista de categorías
      const response = await axios.get('/categories');
      setCategories(response.data.categories);
      setTotalPages(response.data.totalPages);
      setTotalCategories(response.data.totalCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewCategory({ ...newCategory, image: e.target.files[0] });
    }
  };

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Crear Categoría</h2>
        <Form onSubmit={handleCreateCategory}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa el nombre de la categoría"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa la descripción de la categoría"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              Imagen
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="mt-4">
              Crear
            </Button>
          </div>
        </Form>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Categorías</h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 mr-2"
            />
            <Button type="button" onClick={handleSearch}>
              Buscar
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white shadow-md rounded overflow-hidden"
            >
              {category.image && (
                <img
                  src={`${imagesRoute}/${category.image}`}
                  alt={category.name}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
                {user.role === 'admin' && (
                  <Button
                    type="button"
                    onClick={() => handleDeleteCategory(category._id)}
                    className="mt-4"
                  >
                    Eliminar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <p>
            Mostrando {(currentPage - 1) * 9 + 1} - { (currentPage - 1) * 9 + categories.length }
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
    </div>
  );
};

export default CategoryPage;
