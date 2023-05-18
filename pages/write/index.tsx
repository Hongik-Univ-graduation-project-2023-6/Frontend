import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { HEADER_HEIGHT, SIDE_PADDING } from '@/constants/layout';
import { PATH } from '@/constants/path';
import Editor from './components/editor';

const WritePage = () => {
  const router = useRouter();

  return (
    <div css={layout}>
      <Header />
      <Editor
        onCancelButtonClick={() => router.push(PATH.MAIN)}
        onSubmitSuccess={() => router.push(PATH.MAIN)}
      />
    </div>
  );
};

const layout = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: ${HEADER_HEIGHT} ${SIDE_PADDING} 0;
`;

export default WritePage;
