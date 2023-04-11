import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko">
      <Head />
      <title>이상해풀</title>
      <meta charSet="utf-8"></meta>
      <body>
        <Main />
        <div id="modal-root" />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
