import React, { FC } from 'react';
import CustomButton from './CustomButton';
import { Button } from '@chakra-ui/react';

interface ScrollableCardProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptTerms: () => void; // Ensure this function is defined in the props
}

const ScrollableCard: FC<ScrollableCardProps> = ({ isOpen, onClose, onAcceptTerms }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="scrollable-card" tabIndex={-1}>
        <div className="card-content">
          <h2>Términos y Condiciones</h2>

          <section>
            <h3>Introducción</h3>
            <p>
              LifeLink, en su compromiso con la solidaridad y la vida, establece la importancia de garantizar el adecuado tratamiento de la información de sus usuarios y miembros de la comunidad, en concordancia con los principios de responsabilidad, respeto, transparencia y equidad.
            </p>
          </section>

          <section>
            <h3>Alcance</h3>
            <p>
              La presente política de privacidad es vinculante para LifeLink como responsable del tratamiento de datos, así como para sus afiliadas y entidades asociadas, en adelante denominadas "LifeLink". Esta política aplica a todas las actividades relacionadas con el tratamiento de datos personales de los usuarios de LifeLink y su comunidad.
            </p>
            <h4>Información que recolectamos y almacenamos de nuestros clientes:</h4>
            <ul>
              <li>Datos públicos: es el dato que no sea privado o sensible. Por ejemplo: número y tipo de documento de identidad, información contenida en documentos públicos, estado civil, oficio o profesión, teléfono y correo electrónico corporativos.</li>
              <li>Datos privados: son aquellos que por su naturaleza íntima o reservada sólo son relevantes para el titular. Por ejemplo: nivel de ingresos, datos financieros, capacidad de endeudamiento, patrimonio bruto, personas a cargo, composición del grupo familiar, hobbies o aficiones, bienes que posee, información laboral, preferencias en redes sociales, hábitos de conducción, hábitos de consumo, así como datos de contacto como dirección, teléfono y correo electrónico personal.</li>
              <li>Datos sensibles: categoría de datos personales que se reducen a la categoría más íntima y sensible de su titular, cuyo tratamiento inadecuado, puede conllevar a la discriminación y/o al sufrimiento de un perjuicio grave y de difícil reparación. Por ejemplo: datos biométricos e historia clínica o datos relacionados con la salud en general.</li>
            </ul>
          </section>

          <section>
            <h3>Lineamientos generales</h3>
            <p>
              Tratamiento al cual serán sometidos los datos personales: LifeLink usará la información personal de sus clientes para los fines autorizados e informados al titular y aquellos señalados en la presente política, siempre que el tratamiento obedezca a un fin legítimo y sea proporcional de acuerdo a la vinculación del cliente, particularmente para lo que resulte necesario para la prestación de los servicios encargados, como ejecutar y cumplir el contrato. La autorización de tratamiento de datos sensibles es facultativa.
            </p>
          </section>

          <section>
            <h3>Finalidades del tratamiento de datos</h3>
            <p>
              LifeLink tratará los datos personales de sus usuarios con el fin de facilitar la interacción en la comunidad, proporcionar servicios de apoyo a donantes y receptores de órganos no vitales, y cumplir con las finalidades inherentes al objeto contractual y al funcionamiento de la plataforma.
            </p>
          </section>

          <section>
            <h3>Derechos de los titulares</h3>
            <p>
              Los usuarios de LifeLink tienen derecho a autorizar, revocar, conocer, actualizar y rectificar sus datos personales, así como a solicitar su supresión, de acuerdo con lo establecido en la normativa vigente.
            </p>
            <p>
              Derechos de los titulares: de acuerdo con lo establecido en la Ley 1581 de 2012, los titulares tienen derecho a autorizar el tratamiento de sus datos personales, revocar la autorización, conocer los datos que son tratados, actualizarlos, rectificarlos cuando se considere que existe deficiencia en su calidad, y finalmente solicitar la supresión de datos siempre y cuando no exista una obligación legal o contractual de continuar con el tratamiento (artículo 2.2.2.25.2.8 Decreto 1074 de 2015), por ejemplo en el caso de las finalidades que son inherentes al objeto contratado y sin las cuales no es posible su ejecución o las inherentes al funcionamiento de LAS COMPAÑÍAS.
            </p>
          </section>

          <section>
            <h3>Principios generales de tratamiento de datos</h3>
            <p>
              LifeLink se compromete a garantizar el tratamiento legal, finalidad legítima, libertad, veracidad y calidad, transparencia, acceso y circulación restringida, seguridad, confidencialidad y entrega de información personal a proveedores de servicios.
            </p>
            <p>
              Principios generales que se acogen para garantizar la protección de los datos personales de los clientes de LAS COMPAÑÍAS: dentro del compromiso legal y corporativo de LAS COMPAÑÍAS para garantizar la confidencialidad de la información personal de sus clientes, se establecen como principios generales para el tratamiento de la información, en desarrollo de los ya presentes en la Ley 1581 del 2012 y el capítulo 25 del Decreto 1074 de 2015, y demás normas aplicables, los siguientes:
            </p>
            <ul>
              <li><strong>Principio de legalidad:</strong> no habrá tratamiento de información personal de los clientes sin observar las reglas establecidas en la normatividad vigente.</li>
              <li><strong>Principio de finalidad:</strong> la incorporación de datos a las bases físicas o digitales de LifeLink deberá obedecer a una finalidad legítima, la cual será oportunamente informada al titular en la cláusula de autorización para el tratamiento y en la política de privacidad.</li>
              <li><strong>Principio de libertad:</strong> LifeLink realizarán tratamiento de datos personales de sus clientes cuando cuenten con la autorización de estos o cuando por norma exista una facultad para hacerlo, en los términos del art. 3° literal a) y 6° literal a) de la Ley 1581 del 2012, así como la sección II del capítulo 25 del Decreto 1074 de 2015.</li>
              <li><strong>Principio de veracidad y calidad:</strong> LifeLink propenderán porque la información de sus clientes sea veraz y se encuentre actualizada, para lo cual dispondrá de medios eficientes para la actualización y rectificación de los datos personales.</li>
              <li><strong>Principio de transparencia:</strong> dentro de los mecanismos que se establezcan para el ejercicio de los derechos de los titulares de la información personal, se garantizará al titular y a sus causahabientes, así como a los terceros autorizados por este, el acceso a la información sobre datos personales que le conciernan.</li>
              <li><strong>Principio de acceso y circulación restringida:</strong> LifeLink se comprometen a garantizar que únicamente personas autorizadas podrán acceder a la información personal. Asimismo, su circulación se limitará al ejercicio de las finalidades autorizadas por el usuario o por la normatividad. LifeLink dispondrán de medios contractuales para garantizar la confidencialidad y circulación restringida de la información.</li>
              <li><strong>Principio de seguridad:</strong> LifeLink adelantarán todas las medidas técnicas, administrativas y humanas para garantizar que la información personal de los titulares, almacenada en bases de datos físicas o digitales, no circule o personas no autorizadas accedan a ella.</li>
              <li><strong>Principio de confidencialidad:</strong> todas las personas que intervengan en el tratamiento de datos personales que no tengan la naturaleza de públicos están obligadas a garantizar la reserva de la información, inclusive después de finalizada su relación con alguna de las labores que comprende el tratamiento, pudiendo sólo realizar suministro o comunicación de datos personales cuando ello corresponda al desarrollo de las actividades autorizadas en la ley y en los términos de la misma.</li>
            </ul>
          </section>

          <section>
            <h3>Vigencia y modificaciones de la política de privacidad</h3>
            <p>
              Esta política de privacidad entrará en vigencia a partir de la fecha de su publicación y podrá ser modificada por LifeLink en cualquier momento para adaptarse a cambios normativos o necesidades de la plataforma.
            </p>
          </section>
        </div>
        <Button className='btn2' style={{marginBottom: 20}} onClick={onClose}>Cerrar</Button>
        <CustomButton className='btn2' onClick={onAcceptTerms}>Acepta los términos y condiciones</CustomButton>
      </div>
    </div> 
  );
};

export default ScrollableCard;
