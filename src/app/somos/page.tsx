'use client';

import Check from '@/constants/svg/check.svg';
import FeatureSvg from '@/constants/svg/features.svg';
import { useRouter } from 'next/navigation';

const QuienesSomos = () => {
  const router = useRouter();
  const values = [
    {
      title: 'Solidaridad',
      description: 'Creemos en la fuerza de la comunidad y en el apoyo mutuo para superar los desafíos de la vida.',
    },
    {
      title: 'Transparencia',
      description: 'Nos comprometemos a mantener procesos claros y honestos, proporcionando información precisa y accesible.',
    },
    {
      title: 'Respeto',
      description: 'Valoramos la dignidad de cada individuo, asegurando un trato respetuoso y considerado en cada interacción.',
    },
    {
      title: 'Responsabilidad',
      description: 'Asumimos la responsabilidad de proteger la información de nuestros usuarios y de garantizar la seguridad de cada donación y trasplante.',
    },
  ];

  return (
    <div className={(`min-h-screen bg-gray-100`)}>
        <button
          onClick={() => router.push('/')}
          className={(`absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200`)}
        >
          Volver a la página principal
        </button>
      <section className={(`bg-white pb-6`)}>
        <div className={(`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8`)}>
          <div className={(`container mx-auto px-6 p-6 bg-white`)}>
            <div className={(`mb-16 text-center`)}>
              <h4 className={(`text-base text-[#FF5A5A] font-semibold tracking-wide uppercase`)}>¿Quiénes Somos?</h4>
              <p className={(`mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900`)}>
                En LifeLink, creemos en el poder de la comunidad y la solidaridad para salvar y transformar vidas.
              </p>
            </div>
            <div className={(`flex flex-wrap my-12`)}>
              <div className={(`w-full lg:w-1/2 p-8`)}>
                <h2 className={(`text-3xl font-bold text-gray-900 mb-4`)}>Nuestra Misión</h2>
                <p className={(`leading-loose text-gray-500 mb-8`)}>
                  Facilitar y promover la donación de órganos no vitales, brindando una plataforma segura y eficiente donde los donantes puedan ofrecer una segunda oportunidad de vida a quienes más lo necesitan. Fomentamos una cultura de generosidad y empatía, trabajando para reducir las listas de espera y mejorar la calidad de vida de nuestros usuarios.
                </p>
                <h2 className={(`text-3xl font-bold text-gray-900 mb-4`)}>Nuestra Visión</h2>
                <p className={(`leading-loose text-gray-500 mb-8`)}>
                  Aspiramos a ser la comunidad líder en la donación de órganos no vitales, donde cada persona pueda encontrar el apoyo necesario para dar y recibir el regalo de la vida. Nos esforzamos por crear un mundo donde la donación de órganos sea un acto natural y accesible, con procesos transparentes y humanos que aseguren la confianza y el bienestar de todos los involucrados.
                </p>
              </div>
              <div className={(`w-full lg:w-1/2 p-8`)}>
                <FeatureSvg width="100%" height="100%" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={(`bg-white pb-6`)}>
        <div className={(`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8`)}>
          <div className={(`container mx-auto px-6 p-6 bg-white`)}>
            <div className={(`mb-16 text-center`)}>
              <h4 className={(`text-base text-[#FF5A5A] font-semibold tracking-wide uppercase`)}>Nuestros Valores</h4>
            </div>
            <div className={(`flex flex-wrap my-12`)}>
              {values.map((value, index) => (
                <div key={index} className={(`w-full lg:w-1/2 p-8`)}>
                  <div className={(`flex items-center mb-6`)}>
                    <Check width={20} height={20} fill="currentColor" className={(`h-6 w-6 text-[#FF5A5A]`)} />
                    <div className={(`ml-4 text-xl font-semibold`)}>{value.title}</div>
                  </div>
                  <p className={(`leading-loose text-gray-500`)}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={(`bg-white pb-6`)}>
        <div className={(`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8`)}>
          <div className={(`container mx-auto px-6 p-6 bg-white`)}>
            <div className={(`mb-16 text-center`)}>
              <h4 className={(`text-base text-[#FF5A5A] font-semibold tracking-wide uppercase`)}>Nuestro Equipo</h4>
              <p className={(`mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900`)}>
                Profesionales dedicados de diversas disciplinas
              </p>
            </div>
            <p className={(`leading-loose text-gray-500 mb-8`)}>
              Nuestro equipo está compuesto por profesionales dedicados de diversas disciplinas, incluyendo expertos en salud, tecnología y atención al cliente, todos trabajando juntos para crear una experiencia segura y positiva para nuestros usuarios. Colaboramos estrechamente con hospitales, centros médicos y organizaciones de donación para asegurar que cada donación y trasplante se realice con los más altos estándares de calidad y ética.
            </p>
            <p className={(`leading-loose text-gray-500 mb-8`)}>
              Únete a LifeLink y forma parte de una comunidad comprometida con salvar vidas y crear un impacto duradero. Juntos, podemos hacer la diferencia.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomos;
