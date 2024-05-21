import { tw } from 'twind';
import Check from '@/constants/svg/check.svg';
import Button from '@/components/homepage/button';

const features = [
  `Contacto directo con especialistas`,
  `Seguimiento asesorado`,
  `Cursos y talleres exclusivos`,
  `Descuentos en productos de salud`,
  `Domicilios con mas bajo costo`,
  `Acceso a conferencias profesionales`,
  `Descuento en el merchandising de LifeLink`,
  `Acceso a la comunidad de LifeLink`,
];

const PricingTable = () => (
  <section className={tw(`bg-gradient-to-b from-gray-100 to-white shadow-inner pt-12`)}>
    <div className={tw(`relative max-w-7xl mx-auto mb-24`)}>
      <div className={tw(`overflow-hidden lg:max-w-none lg:flex`)}>
        <div className={tw(`py-8 px-6 md:px-0 lg:flex-shrink-1`)}>
          <h2 className={tw(`text-4xl lg:text-7xl font-bold text-gray-800 mb-12`)}>¿Estás listo?</h2>
          <p className={tw(`mt-6 text-base leading-6 text-gray-500`)}>
            Ten acceso a múltiples beneficios y ofertas exclusivas para ti. LifeLink te promete un servicio de calidad y seguridad
            para que puedas disfrutar de una experiencia única. Te mereces la mejor atención y estás a punto de obtenerla.
          </p>
          <div className={tw(`mt-8`)}>
            <div className={tw(`flex items-center`)}>
              <h3
                className={tw(
                  `flex-shrink-0 pr-4 text-sm leading-5
                tracking-wider font-semibold uppercase text-[#FF5A5A]`,
                )}
              >
                Beneficios
              </h3>
              <div className={tw(`flex-1 border-t-2 border-gray-200`)} />
            </div>
            <ul className={tw(`mt-8 lg:grid lg:grid-cols-2`)}>
              {features.map((feature) => (
                <li className={tw(`flex items-center lg:col-span-1`)} key={feature}>
                  <div className={tw(`flex-shrink-0`)}>
                    <Check className={tw(`h-8 w-8 mr-3 mb-1`)} />
                  </div>
                  <p className={tw(`text-gray-600`)}>{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={tw(
            `py-8 px-6 text-center lg:flex-shrink-0
            lg:flex lg:flex-col lg:justify-center lg:p-12`,
          )}
        >
          <p className={tw(`text-lg font-medium text-gray-800`)}>Si ordenas ahora...</p>
          <div className={tw(`my-4 flex items-center justify-center text-6xl leading-none font-bold text-gray-800`)}>
            $29/mes
          </div>
          <Button primary modifier="mt-6">
            Información de precios
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default PricingTable;
