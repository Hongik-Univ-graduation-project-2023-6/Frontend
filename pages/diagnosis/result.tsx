import { css } from '@emotion/react';
import Image from 'next/image';
import leaf from 'public/assets/img/leaf.webp';
import Header from '@/components/Header';
import Text from '@/components/Text';
import {
  BOTTOM_NAVIGATION_HEIGHT,
  HEADER_HEIGHT,
  SIDE_PADDING,
} from '@/constants/layout';
import { colors } from '@/styles/colors';
import ResultChart from './components/ResultChart';

const ResultPage = () => {
  const result = [
    {
      name: '더뎅이병, 검은별무늬병',
      percentage: 40,
    },
    {
      name: '건강함',
      percentage: 25,
    },
    {
      name: '점무늬병',
      percentage: 20,
    },
    {
      name: '녹병',
      percentage: 10,
    },
    {
      name: '복합성 질병',
      percentage: 3,
    },
    {
      name: '흰가루병',
      percentage: 2,
    },
  ];

  return (
    <div css={layout}>
      <Header />
      <div css={textArea}>
        <Text weight="bold" size="md">
          AI 진단결과
        </Text>
      </div>
      <Image src={leaf} alt="leaf image" width={200} height={200} />
      <ResultChart data={result} />
    </div>
  );
};

const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: ${HEADER_HEIGHT} ${SIDE_PADDING}
    calc(${BOTTOM_NAVIGATION_HEIGHT} + 1rem);
`;

const textArea = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${colors.grayline2};
`;

export default ResultPage;
