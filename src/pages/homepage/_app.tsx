import { AppProps } from 'next/app';
import '@/styles/global.css';
import '@fontsource/inter';

import { setup } from 'twind';
import twindConfig from "twind.config";
import { useRouter } from 'next/router';
import Head from 'next/head';





// if (typeof window !== `undefined`) {
//   setup(twindConfig);
// }

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (typeof window !== `undefined` && router.pathname !== "/catalogo") {
    setup(twindConfig); // Twind runs on all pages EXCEPT `/catalogo`
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lilita+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />;
    </>
  )
}
