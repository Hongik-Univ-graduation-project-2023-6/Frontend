import { css } from '@emotion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import leaf from 'public/assets/img/leaf.webp';
import BottomNaviagtion from '@/components/BottomNavigation';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Text from '@/components/Text';
import { INVALID_LEAF_IMAGE_MESSAGE } from '@/constants/diagnosis';
import {
  BOTTOM_NAVIGATION_HEIGHT,
  HEADER_HEIGHT,
  SIDE_PADDING,
} from '@/constants/layout';
import { PATH } from '@/constants/path';
import { $diagnosisResultState } from '@/states/atoms/diagnosisResultState';
import InvalidLeafInfo from './components/InvalidLeafInfo';
import ResultChart from './components/ResultChart';

const ResultPage = () => {
  const router = useRouter();
  const diagnosisResultState = useRecoilValue($diagnosisResultState);
  const [isInvalidLeafImage, setIsInvalidLeafImage] = useState(false);

  const handleGoBackButtonClick = () => {
    router.push(PATH.DIAGNOSIS);
  };

  useEffect(() => {
    if (!diagnosisResultState?.result.length) {
      router.push(PATH.DIAGNOSIS);
    }

    if (diagnosisResultState?.result[0]?.name === INVALID_LEAF_IMAGE_MESSAGE) {
      setIsInvalidLeafImage(true);
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
          {isInvalidLeafImage ? (
            <div css={resultArea}>
              <InvalidLeafInfo />
              <Button
                type="button"
                label="사진 다시 선택하기"
                onClick={handleGoBackButtonClick}
              />
            </div>
          ) : (
            <div css={resultArea}>
              <ResultChart data={diagnosisResultState.result} />
              <Button
                type="button"
                label="사진 다시 선택하기"
                onClick={handleGoBackButtonClick}
              />
            </div>
          )}
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
  padding: ${HEADER_HEIGHT} ${SIDE_PADDING}
    calc(${BOTTOM_NAVIGATION_HEIGHT} + 2rem);
`;

const textArea = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 1.5rem;
`;

const resultArea = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;

  & > button {
    width: 80%;
    height: 2.75rem;
  }
`;

export default ResultPage;
