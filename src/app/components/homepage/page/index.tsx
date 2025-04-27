import Head from 'next/head';
import Navigation from '@/app/components/homepage/navigation';

interface IProps {
  children: React.ReactNode;
}

const Page = ({ children }: IProps) => (
  <div>
    <Head>
      <link rel="icon" href="/logo-transparent.png" />
    </Head>
    <div>
      <Navigation />
      {children}
    </div>
  </div>
);

export default Page;
