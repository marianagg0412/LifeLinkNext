import FeatureSvg from '@/constants/svg/features.svg';

const listItems = [
  {
    title: `¿Qué rol cumples?`,
    description: `Identifícate como donante o receptor, ¡o incluso ambos!. 
    Ser participante de LifeLink tiene beneficios para todos, y siempre
    estaremos para ayudarte a ti o a un ser querido.`,
  },
  {
    title: `Compartenos tus datos`,
    description: `Para nosotros es muy importante tu seguridad y la de 
    toda nuestra comunidad, por eso queremos conocerte mejor. Asegurate de 
    compartir tu información de manera correcta y verídica.`,
  },
  {
    title: `Explora`,
    description: `LifeLink tiene un gran espacio para que puedas explorar tus
    mejores opciones. Tómate tu tiempo y revisa todas las posibilidades que
    te ofrecemos para que puedas tomar la mejor decisión.`,
  },
];

const ListSection = () => (
  <section className={(`lg:py-28 pt-28 overflow-hidden`)}>
    <div className={(`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white`)}>
      <div className={(`mb-16 text-center`)}>
        <h2 className={(`text-base text-[#FF5A5A] font-semibold tracking-wide uppercase`)}>Aumenta tu impacto</h2>
        <p className={(`mt-2 pb-4 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900`)}>
          Crea tus sueños con nosotros
        </p>
      </div>
      <div className={(`flex flex-wrap -mx-8 items-center`)}>
        <div className={(`w-full lg:w-1/2 px-8`)}>
          <ul className={(`space-y-12`)}>
            {listItems.map((item, index) => (
              <li className={(`flex -mx-4`)} key={item.title}>
                <div className={(`px-4`)}>
                  <span
                    className={(`flex w-16 h-16 mx-auto items-center
                      justify-center text-2xl font-bold rounded-full
                      bg-blue-50 text-blue-500`)}
                  >
                    {index + 1}
                  </span>
                </div>
                <div className={(`px-4`)}>
                  <h3 className={(`my-4 text-xl font-semibold`)}>{item.title}</h3>
                  <p className={(`text-gray-500 leading-loose`)}>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={(`w-full lg:w-1/2 px-8`)}>
          <div className={(`lg:mb-12 pb-12 lg:pb-0 mt-16 lg:mt-0 mx-6 lg:mx-0`)}>
            <FeatureSvg width="100%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ListSection;
