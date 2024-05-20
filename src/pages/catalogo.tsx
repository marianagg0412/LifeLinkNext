import { useState, useEffect } from 'react';
import { tw } from 'twind';
import { useRouter } from 'next/router';

const products = [
  {
    name: 'Ligamentos',
    description: 'Órgano vital para el sistema circulatorio.',
    image: 'https://via.placeholder.com/150',
    type: 'Vital',
    rh: 'O+',
  },
  {
    name: '1L de sangre',
    description: 'Órgano vital para el sistema urinario.',
    image: 'https://via.placeholder.com/150',
    type: 'Vital',
    rh: 'A+',
  },
  // Add more products as needed
];

const Catalogo = () => {
  const router = useRouter();
  const [section, setSection] = useState('para-ti');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({ type: '', rh: '' });

  useEffect(() => {
    if (section === 'para-ti') {
      // Apply matching algorithm to filter products
      const matchedProducts = products.filter(product => {
        return (
          (!filters.type || product.type === filters.type) &&
          (!filters.rh || product.rh === filters.rh)
        );
      });
      setFilteredProducts(matchedProducts);
    }
  }, [section, filters]);

  const handleFilterChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterApply = () => {
    setSection('para-ti');
  };

  const handleFilterReset = () => {
    setFilters({ type: '', rh: '' });
    setSection('para-ti');
  };

  return (
    <div className={tw(`min-h-screen bg-gray-100 relative`)}>
      <button
        onClick={() => router.push('/main')}
        className={tw(`absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 z-10`)}
      >
        Volver a la página principal
      </button>
      <div>
        <button
          onClick={() => setSection('para-ti')}
          className={tw(`absolute top-4 left-5 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mr-2`)}
        >
          Para ti
        </button>
        <button
          onClick={() => setSection('categorias')}
          className={tw(`absolute top-4 left-[7rem] bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ml-2`)}
        >
          Categorías
        </button>
      </div>
      {section === 'para-ti' && (
        <section className={tw(`bg-white pb-6`)}>
          <div className={tw(`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8`)}>
            <div className={tw(`container mx-auto px-6 p-6 bg-white`)}>
              <div className={tw(`mb-16 text-center`)}>
                <h4 className={tw(`text-base text-[#FF5A5A] font-semibold tracking-wide uppercase`)}>Catálogo</h4>
                <p className={tw(`mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900`)}>
                  Nuestros Productos
                </p>
              </div>
              <div className={tw(`flex flex-wrap my-12`)}>
                {filteredProducts.map((product, index) => (
                  <div key={index} className={tw(`w-full lg:w-1/3 p-8`)}>
                    <div className={tw(`flex flex-col items-center mb-6`)}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={tw(`w-full h-64 object-cover rounded-lg mb-4`)}
                      />
                      <div className={tw(`text-xl font-semibold`)}>{product.name}</div>
                    </div>
                    <p className={tw(`leading-loose text-gray-500 mb-8 text-center`)}>{product.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      {section === 'categorias' && (
        <section className={tw(`bg-white pb-6`)}>
          <div className={tw(`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8`)}>
            <div className={tw(`container mx-auto px-6 p-6 bg-white`)}>
              <div className={tw(`mb-16 text-center`)}>
                <h4 className={tw(`text-base text-[#FF5A5A] font-semibold tracking-wide uppercase`)}>Categorías</h4>
                <p className={tw(`mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900`)}>
                  Filtrar Catálogo
                </p>
              </div>
              <div className={tw(`flex flex-col items-center`)}>
                <div className={tw(`mb-4`)}>
                  <label className={tw(`block text-gray-700 mb-2`)}>Tipo</label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className={tw(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
                  >
                    <option value="">Todos</option>
                    <option value="Vital">Vital</option>
                    <option value="No Vital">No Vital</option>
                  </select>
                </div>
                <div className={tw(`mb-4`)}>
                  <label className={tw(`block text-gray-700 mb-2`)}>RH</label>
                  <select
                    name="rh"
                    value={filters.rh}
                    onChange={handleFilterChange}
                    className={tw(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
                  >
                    <option value="">Todos</option>
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className={tw(`flex space-x-4`)}>
                  <button
                    onClick={handleFilterApply}
                    className={tw(`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200`)}
                  >
                    Filtrar
                  </button>
                  <button
                    onClick={handleFilterReset}
                    className={tw(`bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200`)}
                  >
                    Quitar Filtros
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Catalogo;
