import { reset } from '@/styles/reset';
import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global styles={reset} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
