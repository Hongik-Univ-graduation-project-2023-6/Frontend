import { css } from '@emotion/react';
import Image from 'next/image';
import leaf from 'public/assets/img/leaf.webp';
import BottomNaviagtion from '@/components/BottomNavigation';
import Header from '@/components/Header';
import Text from '@/components/Text';
import {
  BOTTOM_NAVIGATION_HEIGHT,
  HEADER_HEIGHT,
  SIDE_PADDING,
} from '@/constants/layout';
import { colors } from '@/styles/colors';
import ImageFileForm from './components/ImageFileForm';

const DiagnosisPage = () => {
  return (
    <div css={layout}>
      <Header />
      <Image src={leaf.src} alt="leaf image" width={200} height={100} />
      <div css={textArea}>
        <Text weight="bold" size="lg">
          식물 질병 진단 테스트
        </Text>
        <Text weight="bold" size="md">
          AI를 통해 식물의 건강 상태를 진단합니다
        </Text>
      </div>
      <ImageFileForm />
      <BottomNaviagtion />
    </div>
  );
};

const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 100vh;
  padding: ${HEADER_HEIGHT} ${SIDE_PADDING}
    calc(${BOTTOM_NAVIGATION_HEIGHT} + 1rem);
`;

const textArea = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  & > p:first-of-type {
    color: ${colors.grayline1};
  }

  & > p:last-of-type {
    color: ${colors.graytext2};
  }
`;

export default DiagnosisPage;
