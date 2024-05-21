import { useState, useEffect } from 'react';
import { tw } from 'twind';
import { useRouter } from 'next/router';

const products = [
  {
    name: 'Dermis Acelular',
    description: 'La dermis acelular es un injerto de piel procesado para eliminar células y reducir el riesgo de rechazo. Ideal para pacientes con quemaduras graves, heridas crónicas y reconstrucción de tejidos blandos. Proporciona una matriz estructural que facilita la regeneración de la piel.',
    image: 'https://salugraftdental.com/wp-content/uploads/2021/05/oracell-web.png',
    category: 'Tejido Blando',
    use: 'Reparación de Heridas',
    especialidadMedica: 'Cirugía Plástica'
  },
  {
    name: 'Tejido Osteomuscular',
    description: 'Este tejido incluye hueso, cartílago y tejido muscular. Utilizado en cirugías ortopédicas y traumatológicas para reparar fracturas complejas, reemplazar hueso perdido y mejorar la función muscular. Es fundamental en la reconstrucción de extremidades y articulaciones.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Lateral_head_anatomy.jpg/250px-Lateral_head_anatomy.jpg',
    category: 'Tejido Duro',
    use: 'Rehabilitación Ortopédica',
    especialidadMedica: 'Ortopedia'
  },
  {
    name: 'Membrana Amniótica',
    description: 'La membrana amniótica se obtiene de la placenta y es rica en factores de crecimiento que promueven la cicatrización y reducen la inflamación. Utilizada en oftalmología para tratar úlceras corneales y en cirugía plástica para mejorar la cicatrización de heridas.',
    image: 'https://www.martacalatayud.com/wp-content/uploads/2019/12/membrana-amni%C3%B3tica-2.jpg',
    category: 'Tejido Blando',
    use: 'Reparación de Heridas',
    especialidadMedica: 'Oftalmología'
  },
  {
    name: 'Tejido Corneal',
    description: 'Los injertos de córnea se emplean para restaurar la visión en pacientes con enfermedades corneales, cicatrices o deformaciones. Estos tejidos transparentes son esenciales para recuperar la claridad visual y mejorar la calidad de vida.',
    image: 'https://www.topdoctors.es/files/Image/large/58b6a446-7ad8-4458-9b8a-51de8ac97da0.jpg',
    category: 'Tejido Ocular',
    use: 'Recuperación Visual',
    especialidadMedica: 'Oftalmología'
  },
  {
    name: 'Cartílago',
    description: 'El cartílago donado se utiliza en cirugías ortopédicas para reparar articulaciones dañadas y en cirugía plástica para reconstruir estructuras faciales. Es crucial para restaurar la función y apariencia natural de las áreas afectadas.',
    image: 'https://thumbs.dreamstime.com/b/demostraci%C3%B3n-del-hueso-de-la-pierna-cerdo-junta-cart%C3%ADlago-104724663.jpg',
    category: 'Tejido Duro',
    use: 'Rehabilitación Ortopédica',
    especialidadMedica: 'Ortopedia'
  },
  {
    name: 'Tejido Valvular Cardíaco',
    description: 'Las válvulas cardíacas de donante son utilizadas en cirugías de reemplazo valvular para tratar enfermedades del corazón. Ayudan a mejorar el flujo sanguíneo y la función cardíaca en pacientes con válvulas dañadas o enfermas.',
    image: 'https://efesalud.com/wp-content/uploads/2021/10/2011_Heart_Valves.jpg',
    category: 'Tejido Duro',
    use: 'Mejora de la Función Cardíaca',
    especialidadMedica: 'Cardiología'
  },
  {
    name: 'Ligamentos y Tendones',
    description: 'Estos tejidos son esenciales para reparar y reconstruir estructuras de soporte en el cuerpo. Utilizados en cirugías deportivas y reconstructivas, ayudan a restaurar la movilidad y estabilidad de las articulaciones.',
    image: 'https://www.fisioterapia-online.com/sites/default/files/styles/post_image/public/glosario_images/xligamentos_tejido_fibroso.jpg,qitok=iQUECszL.pagespeed.ic.sA0bra0BSn.jpg',
    category: 'Tejido Duro',
    use: 'Rehabilitación Ortopédica',
    especialidadMedica: 'Ortopedia'
  }
];



const Catalogo = () => {
  const router = useRouter();
  const [section, setSection] = useState('para-ti');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({ category: '', use: '', especialidadMedica: '' });

  useEffect(() => {
    const matchedProducts = products.filter(product => {
      return (
          (!filters.category || product.category === filters.category) &&
          (!filters.use || product.use === filters.use) &&
          (!filters.especialidadMedica || product.especialidadMedica === filters.especialidadMedica)
      );
    });
    setFilteredProducts(matchedProducts);
  }, [filters]);


  const handleFilterChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterReset = () => {
    setFilters({ category: '', use: '', especialidadMedica: '' });
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
                      <label className={tw(`block text-gray-700 mb-2`)}>Especialidad Médica</label>
                      <select
                          name="especialidadMedica"
                          value={filters.especialidadMedica}
                          onChange={handleFilterChange}
                          className={tw(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
                      >
                        <option value="">Todas</option>
                        <option value="Cirugía Plástica">Cirugía Plástica</option>
                        <option value="Ortopedia">Ortopedia</option>
                        <option value="Oftalmología">Oftalmología</option>
                        <option value="Cardiología">Cardiología</option>
                      </select>
                    </div>
                    <div className={tw(`mb-4`)}>
                      <label className={tw(`block text-gray-700 mb-2`)}>Tipo de Tejido</label>
                      <select
                          name="category"
                          value={filters.category}
                          onChange={handleFilterChange}
                          className={tw(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
                      >
                        <option value="">Todos</option>
                        <option value="Tejido Blando">Tejido Blando</option>
                        <option value="Tejido Duro">Tejido Duro</option>
                        <option value="Tejido Ocular">Tejido Ocular</option>
                      </select>
                    </div>
                    <div className={tw(`mb-4`)}>
                      <label className={tw(`block text-gray-700 mb-2`)}>Uso Terapéutico</label>
                      <select
                          name="use"
                          value={filters.use}
                          onChange={handleFilterChange}
                          className={tw(`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`)}
                      >
                        <option value="">Todos</option>
                        <option value="Reparación de Heridas">Reparación de Heridas</option>
                        <option value="Rehabilitación Ortopédica">Rehabilitación Ortopédica</option>
                        <option value="Recuperación Visual">Recuperación Visual</option>
                        <option value="Mejora de la Función Cardíaca">Mejora de la Función Cardíaca</option>
                      </select>
                    </div>
                    <button
                        onClick={handleFilterReset}
                        className={tw(`bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200`)}
                    >
                      Quitar Filtros
                    </button>
                  </div>
                </div>
              </div>
            </section>
        )}

      </div>
  );
};

export default Catalogo;
