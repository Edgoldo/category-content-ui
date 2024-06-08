import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Form from '../components/common/Form';
import { Link } from 'react-router-dom';

const ContentPage = () => {
  const [contents, setContents] = useState([]);
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    category: '',
    type: 'text',
    url: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContents, setTotalContents] = useState([0]);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  const fetchContents = async () => {
    try {
      const response = await axios.get(
        `/content?searchTerm=${searchTerm}&category=${selectedCategory}&page=${currentPage}`
      );
      setContents(response.data.contents);
      setTotalPages(response.data.totalPages);
      setTotalContents(response.data.totalContents);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories?limit=100');
      setCategories(response.data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContents();
    fetchCategories();
  }, [searchTerm, selectedCategory, currentPage]);

  const handleCreateContent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/content', newContent);
      setNewContent({
        title: '',
        description: '',
        category: '',
        type: 'text',
        url: ''
      });
      // Actualizar la lista de contenidos
      await fetchContents();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContent = async (contentId) => {
    try {
      await axios.delete(`/content/${contentId}`);
      // Actualizar la lista de contenidos
      await fetchContents();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Crear Contenido</h2>
        <Form onSubmit={handleCreateContent}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={newContent.title}
              onChange={(e) =>
                setNewContent({ ...newContent, title: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa el título del contenido"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              value={newContent.description}
              onChange={(e) =>
                setNewContent({ ...newContent, description: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa la descripción del contenido"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
              Categoría
            </label>
            <select
              id="category"
              value={newContent.category}
              onChange={(e) =>
                setNewContent({ ...newContent, category: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
              Tipo de Contenido
            </label>
            <select
              id="type"
              value={newContent.type}
              onChange={(e) =>
                setNewContent({ ...newContent, type: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="text">Texto</option>
              <option value="image">Imagen</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="url" className="block text-gray-700 font-bold mb-2">
              URL del Contenido
            </label>
            <input
              type="text"
              id="url"
              value={newContent.url}
              onChange={(e) =>
                setNewContent({ ...newContent, url: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ingresa la URL del contenido"
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
          <h2 className="text-2xl font-bold">Contenido</h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar contenido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-3 py-2 mr-2"
            />
            <Button type="button" onClick={handleSearch}>
              Buscar
            </Button>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border rounded px-3 py-2 ml-2"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.map((content) => (
            <div
              key={content._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {content.type === 'image' && (
                <img src={content.url} alt={content.title} className="w-full h-48 object-cover" />
              )}
              {content.type === 'video' && (
                <div className="w-full h-48 relative">
                  <iframe
                    src={content.url}
                    title={content.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              )}
              {content.type === 'text' && (
                <div className="w-full h-48 relative">
                  <Link to={content.url} target="_blank">
                    <img src="https://cdn-icons-png.freepik.com/512/8257/8257949.png" alt={content.title} className="w-full h-48 object-cover" />
                  </Link>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">
                  {content.title}
                </h3>
                <p className="text-gray-600">
                  {content.description}
                </p>
                <p className="text-gray-500 text-sm">
                  Categoría: {content.category.name}
                </p>
                {user.role === 'admin' && (
                  <Button
                    type="button"
                    onClick={() => handleDeleteContent(content._id)}
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
            Mostrando {(currentPage - 1) * 9 + 1} - {(currentPage - 1) * 9 + contents.length}
            { } de {totalContents} contenidos
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

        export default ContentPage;
