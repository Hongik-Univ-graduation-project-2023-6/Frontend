import { css } from '@emotion/react';
import Header from '@/components/Header';

const IndexPage = () => {
  return (
    <div css={layout}>
      <Header />
      <p>AI 진단결과</p>
    </div>
  );
};

const layout = css`
  display: flex;
  flex-direction: column;
  padding: 6rem 1rem;
`;

export default IndexPage;
