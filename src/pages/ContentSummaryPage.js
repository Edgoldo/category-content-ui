import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const ContentSummaryPage= () => {
  const { categoryId } = useParams();
  const [contents, setContents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get(`/content/category/${categoryId}?searchTerm=${searchTerm}`);
        setContents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContents();
  }, [categoryId, searchTerm]);

  const handleSearch = () => {
    // Aquí puedes agregar la lógica para filtrar los contenidos por el término de búsqueda
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Contenidos</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Buscar contenidos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 mr-2 flex-1"
        />
        <Button type="button" onClick={handleSearch}>
          Buscar
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contents.map((content) => (
          <div
            key={content._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {user && <>
                {content.type === 'image' && (
                  <img src={content.url} alt={content.title} className="w-full h-48 object-cover" />
                )}
                {content.type === 'video' && (
                  <div className="w-full h-48 relative">
                    <iframe
                      src={content.url}
                      title={content.title}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                )}
                {content.type === 'text' && (
                  <div className="p-4">
                      <Link to={content.url} target="_blank">
                      <img src="https://cdn-icons-png.freepik.com/512/8257/8257949.png" alt={content.title} className="w-full h-48 object-cover" />
                      </Link>
                  </div>
                )}
            </>}
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{content.title}</h3>
              <p className="text-gray-600 mb-2">{content.description}</p>
              <p className="text-gray-500 text-sm">Categoría: {content.category.name}</p>
              <p className="text-gray-500 text-sm">Usuario: {content.createdBy.username}</p>
              <p className="text-gray-500 text-sm">Fecha: {new Date(content.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentSummaryPage;
