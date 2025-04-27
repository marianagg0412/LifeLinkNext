'use client';
import Button from '@/app/components/homepage/button';
import Netlify from '@/constants/svg/netlify.svg';
import Nike from '@/constants/svg/nike.svg';
import Figma from '@/constants/svg/figma.svg';
import Aws from '@/constants/svg/aws.svg';

const Header = () => (
  <header className="w-full min-h-screen flex flex-col justify-between">
    <div className="flex-1 flex flex-col justify-center items-center py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-8xl text-center leading-snug text-gray-800">
        Facilitando transplantes con LifeLink
      </h1>
      <div className="max-w-xl mx-auto">
        <p className="mt-10 text-gray-500 text-center text-xl lg:text-3xl">
          Podría salvar tu vida o la de alguien que amas
        </p>
      </div>
      <div className="mt-10 flex justify-center items-center w-full mx-auto">
        <Button>Contáctanos</Button>
      </div>
    </div>
    <div className="flex justify-center w-full">
      <div className="mt-4 w-full">
        <p className="font-mono uppercase text-center font-medium text-sm text-gray-600">Apoyados por</p>
        <div className="flex items-center justify-center mx-auto flex-wrap">
          <Aws className="m-12 mb-8" width={120} />
          <Netlify className="m-12" width={140} />
          <Nike className="m-12" width={140} />
          <Figma className="m-12" width={140} />
        </div>
      </div>
    </div>
  </header>
);

export default Header;