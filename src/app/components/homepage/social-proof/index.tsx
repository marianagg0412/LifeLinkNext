'use client';

import { useState } from 'react';
import Quote from '@/constants/svg/quote.svg';

const socialProofs = [
  {
    name: `John Wick`,
    company: `Health Inc.`,
    image: `/images/social-1.webp`,
    text: `LifeLink ayudó a ampliar las oportunidades para muchos de mis pacientes que 
    se les dificulta acceder a órganos que no se encuentran muy facilmente. Es una herramienta
    revolucionaria que todos deberían tener en cuenta.`,
  },
  {
    name: `Collin Bridgerton`,
    company: `Cliente receptor`,
    image: `/images/social-2.webp`,
    text: `Mi experiencia ha sido muy satisfactoria gracias al acompañamiento que me han brindado.
    Al principio no entendía muy bien cómo era el proceso y tenía temores, pero descubrí que es un
    proceso muy seguro y confiable.`,
  },
];

const SocialProof = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (currentIndex + 1 < socialProofs.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previous = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={(`container mx-auto my-8`)}>
      <div className={(`max-w-7xl mx-auto`)}>
        <section>
          <figure>
            <div className={(`relative bg-white`)}>
              <Quote className={(`w-16 md:w-12 left-0 md:-left-2 absolute top-0 pl-4 md:pl-0 text-gray-300`)} />
              <div className={(`pt-20 px-6 md:px-0`)}>
                <p className={(`text-gray-600 text-base pb-6`)}>{socialProofs[currentIndex].text}</p>
                <div className={(`flex items-center justify-between`)}>
                  <div className={(`flex items-center pb-12`)}>
                    <div className={(`h-12 w-12`)}>
                      <img
                        src={socialProofs[currentIndex].image}
                        alt={socialProofs[currentIndex].name}
                        className={(`h-full w-full object-cover overflow-hidden rounded-full`)}
                        height={48}
                        width={48}
                      />
                    </div>
                    <p className={(`text-gray-600 font-bold ml-3`)}>
                      {socialProofs[currentIndex].name} <br />
                      <span className={(`text-gray-600 text-base font-light`)}>
                        {socialProofs[currentIndex].company}
                      </span>
                    </p>
                  </div>
                  <div className={(`cursor-pointer flex pb-12`)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={44}
                      height={44}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#CBD5E0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={previous}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="15 6 9 12 15 18" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={44}
                      height={44}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#CBD5E0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={next}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </section>
      </div>
    </div>
  );
};

export default SocialProof;
