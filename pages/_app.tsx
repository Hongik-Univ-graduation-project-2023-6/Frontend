import { Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { reset } from '@/styles/reset';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <Global styles={reset} />
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
