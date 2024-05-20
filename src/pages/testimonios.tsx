import { tw } from 'twind';
import Check from '@/constants/svg/check.svg';
import { useRouter } from 'next/router';

const testimonios = [
  {
    name: 'Carlos Gómez',
    location: 'Bogotá, Colombia',
    date: '15 de marzo de 2023',
    story: `Descubrir LifeLink fue una bendición en mi vida. Tras sufrir una grave lesión en la rodilla durante un accidente, me enfrentaba a la posibilidad de perder la movilidad en mi pierna. Mi médico me habló de LifeLink y de cómo podrían ayudarme a encontrar un donante para un injerto de cartílago.

    Desde el primer momento, el equipo de LifeLink me brindó un apoyo increíble, guiándome en cada paso del proceso. Gracias a su dedicación y a la generosidad de un donante, pude recibir el trasplante que necesitaba. Hoy, casi un año después, he recuperado la movilidad y puedo disfrutar de mis actividades diarias sin dolor.

    LifeLink no solo me devolvió la salud física, sino también la esperanza y la calidad de vida. Estoy eternamente agradecido por su ayuda y por el impacto positivo que tienen en tantas vidas.`,
    role: 'Paciente Recuperado',
    image: 'https://img.freepik.com/foto-gratis/vista-lateral-hombre-despreocupado-que-disfruta-libertad-brazos-extendidos_23-2148182869.jpg?size=626&ext=jpg&ga=GA1.1.1788068356.1715731200&semt=ais_user', // Replace with actual image path
  },
  {
    name: 'Ana María Rodríguez',
    location: 'Medellín, Colombia',
    date: '22 de octubre de 2022',
    story: `Cuando me diagnosticaron con una degeneración corneal avanzada, mi mundo se volvió borroso, no solo físicamente, sino también emocionalmente. No podía imaginarme viviendo sin poder ver claramente a mis seres queridos o realizar mis actividades diarias. Mi oftalmólogo me recomendó LifeLink como una opción para encontrar una solución a mi problema.

    Desde el primer contacto, el equipo de LifeLink me trató con una calidez y profesionalismo excepcionales. Me explicaron detalladamente el proceso y me apoyaron en cada paso del camino. Gracias a la generosidad de un donante y al esfuerzo del equipo de LifeLink, pude recibir un trasplante de córnea.

    Hoy, mi visión ha mejorado notablemente y puedo disfrutar nuevamente de cada detalle de la vida. LifeLink no solo me devolvió la vista, sino también la alegría y la confianza en un futuro brillante. Estoy inmensamente agradecida por todo lo que han hecho por mí.`,
    role: 'Receptora de Córnea',
    image: 'https://img.freepik.com/foto-gratis/retrato-mujer-alegre-tela-amarilla-naturaleza_23-2148170258.jpg?t=st=1716178143~exp=1716181743~hmac=e8c19f5a2f9ae9f1a28fcc3711100a0755fcad6d7104567ec58b6caf61ec838b&w=1380', // Replace with actual image path
  },
];
const Testimonios = () => {
    const router = useRouter();
  
    return (
      <div className={tw(`min-h-screen bg-gray-100 relative`)}>
        <button
          onClick={() => router.push('/main')}
          className={tw(`absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200`)}
        >
          Volver a la página principal
        </button>
        <section className={tw(`bg-white pb-6`)}>
          <div className={tw(`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8`)}>
            <div className={tw(`container mx-auto px-6 p-6 bg-white`)}>
              <div className={tw(`mb-16 text-center`)}>
                <h4 className={tw(`text-base text-[#FF5A5A] font-semibold tracking-wide uppercase`)}>Testimonios</h4>
                <p className={tw(`mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900`)}>
                  Observa varios testimonios
                </p>
              </div>
              <div className={tw(`flex flex-wrap my-12`)}>
                {testimonios.map((testimonio, index) => (
                  <div key={index} className={tw(`w-full lg:w-1/2 p-8`)}>
                    <div className={tw(`flex items-center mb-6`)}>
                      <Check width={20} height={20} fill="currentColor" className={tw(`h-6 w-6 text-[#FF5A5A]`)} />
                      <div className={tw(`ml-4 text-xl font-semibold`)}>{testimonio.name}</div>
                    </div>
                    <p className={tw(`text-gray-500 mb-2`)}>{testimonio.location}</p>
                    <p className={tw(`text-gray-500 mb-4`)}>{testimonio.date}</p>
                    <img
                      src={testimonio.image}
                      alt={`${testimonio.name}`}
                      className={tw(`w-full h-64 object-cover rounded-lg mb-4`)}
                    />
                    <p className={tw(`leading-loose text-gray-500 mb-8 whitespace-pre-line`)}>{testimonio.story}</p>
                    <p className={tw(`text-gray-500 font-semibold`)}>{testimonio.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Testimonios;