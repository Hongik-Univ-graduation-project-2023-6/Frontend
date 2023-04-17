import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import leaf from 'public/assets/img/leaf.webp';
import BottomNaviagtion from '@/components/BottomNavigation';
import Header from '@/components/Header';
import Text from '@/components/Text';
import {
  BOTTOM_NAVIGATION_HEIGHT,
  HEADER_HEIGHT,
  SIDE_PADDING,
} from '@/constants/layout';
import { PATH } from '@/constants/path';
import { $diagnosisResultState } from '@/states/atoms/diagnosisResultState';
import { colors } from '@/styles/colors';
import ResultChart from './components/ResultChart';

const ResultPage = () => {
  const router = useRouter();
  const diagnosisResultState = useRecoilValue($diagnosisResultState);

  useEffect(() => {
    if (!diagnosisResultState?.result.length) {
      router.push(PATH.DIAGNOSIS);
    }
  }, [diagnosisResultState, router]);

  return (
    <div css={layout}>
      <Header />
      {!!diagnosisResultState?.result.length && (
        <>
          <div css={textArea}>
            <Text weight="bold" size="lg">
              AI 진단결과
            </Text>
          </div>
          <Image
            src={diagnosisResultState?.targetLeafImageSrc ?? leaf}
            alt="target leaf image"
            width={200}
            height={200}
          />
          <ResultChart data={diagnosisResultState.result} />
          <BottomNaviagtion />
        </>
      )}
    </div>
  );
};

const layout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  min-height: 100vh;
  padding: ${HEADER_HEIGHT} ${SIDE_PADDING}
    calc(${BOTTOM_NAVIGATION_HEIGHT} + 1rem);
`;

const textArea = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${colors.grayline2};
  /* padding-top: 2rem; */
`;

export default ResultPage;
