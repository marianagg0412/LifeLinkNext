import Check from '@/constants/svg/check.svg';

const FeatureSection = () => (
  <section className={(`bg-white pb-6`)}>
    <div className={(`max-w-7xl mx-auto p-4 sm:p-6 lg:p-8`)}>
      <div className={(`container mx-auto px-6 p-6 bg-white`)}>
        <div className={(`mb-16 text-center`)}>
          <h4 className={(`text-base text-[#FF5A5A] font-semibold tracking-wide uppercase`)}>Características</h4>
          <p className={(`mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900`)}>
          Cómo cambiamos el juego
          </p>
        </div>
        <div className={(`flex flex-wrap my-12`)}>
          <div className={(`w-full border-b md:w-1/2 md:border-r lg:w-1/3 p-8`)}>
            <div className={(`flex items-center mb-6`)}>
              <Check width={20} height={20} fill="currentColor" className={(`h-6 w-6 text-[#FF5A5A]`)} />
              <div className={(`ml-4 text-xl`)}>Aumenta la donación</div>
            </div>
            <p className={(`leading-loose text-gray-500`)}>
              Siéntete orgulloso de ser parte de una comunidad que busca mejorar la vida de otros. Ayuda 
              a aumentar la calidad de vida de alguien que lo necesita.
            </p>
          </div>
          <div className={(`w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8`)}>
            <div className={(`flex items-center mb-6`)}>
              <Check width={20} height={20} fill="currentColor" className={(`h-6 w-6 text-[#FF5A5A]`)} />
              <div className={(`ml-4 text-xl`)}>Plataforma moderna</div>
            </div>
            <p className={(`leading-loose text-gray-500 `)}>
              Te brindamos todas las herramientas y facilidades para que tu experiencia en LifeLink 
              impecable. Nuestra plataforma es fácil de usar y está diseñada para ti.
            </p>
          </div>
          <div className={(`w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0 p-8`)}>
            <div className="flex items-center mb-6">
              <Check width={20} height={20} fill="currentColor" className={(`h-6 w-6 text-[#FF5A5A]`)} />
              <div className={(`ml-4 text-xl`)}>Integración con entidades de salud</div>
            </div>
            <p className={(`leading-loose text-gray-500`)}>
              Siéntete seguro, ya que gran parte de nuestra comunidad cuenta con el apoyo de varias entidades
              reconocidas y profesionales, quienes ofrecen todo su apoyo y servicio.
            </p>
          </div>
          <div className={(`w-full border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0 p-8`)}>
            <div className={(`flex items-center mb-6`)}>
              <Check width={20} height={20} fill="currentColor" className={(`h-6 w-6 text-[#FF5A5A]`)} />
              <div className={(`ml-4 text-xl`)}>Recomendado por expertos</div>
            </div>
            <p className={(`leading-loose text-gray-500`)}>
              La comunidad de salud sabe que puede confiar en nosotros, ya que ofrecemos los mejores resultados post-operatorios,
              y la mejor calidad en nuestros productos.
            </p>
          </div>
          <div className={(`w-full border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0 p-8`)}>
            <div className={(`flex items-center mb-6`)}>
              <Check width={20} height={20} fill="currentColor" className={(`h-6 w-6 text-[#FF5A5A]`)} />
              <div className={(`ml-4 text-xl`)}>Construido con legislación vigente</div>
            </div>
            <p className={(`leading-loose text-gray-500`)}>
              Tenemos todos los requisitos de la ley al día, para que tengas plena seguridad que tu experiencia va a ser segura.
            </p>
          </div>
          <div className={(`w-full md:w-1/2 lg:w-1/3 p-8`)}>
            <div className={(`flex items-center mb-6`)}>
              <Check width={20} height={20} fill="currentColor" className={(`h-6 w-6 text-[#FF5A5A]`)} />
              <div className={(`ml-4 text-xl`)}>Variedad de órganos disponibles</div>
            </div>
            <p className={(`leading-loose text-gray-500`)}>
              Siéntete libre de explorar en un amplio catálogo donde encontrarás gran variedad de productos, para cubrir 
              tus necesidades por completo.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FeatureSection;
