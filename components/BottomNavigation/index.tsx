import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { BOTTOM_NAVIGATION_HEIGHT } from '@/constants/layout';
import { PATH } from '@/constants/path';
import Ai from '@/public/assets/svg/ai.svg';
import Talk from '@/public/assets/svg/talk.svg';
import { colors } from '@/styles/colors';
import NavigationButton from './Button';

const BottomNaviagtion = () => {
  const router = useRouter();

  const handleLeftSideButtonClick = () => {
    router.push(PATH.DIAGNOSIS);
  };

  const handleRightSideButtonClick = () => {
    router.push(PATH.MAIN);
  };

  return (
    <div css={wrapper}>
      <NavigationButton
        label="AI 진단"
        icon={<Ai />}
        onClick={handleLeftSideButtonClick}
      />
      <NavigationButton
        label="커뮤니티"
        icon={<Talk />}
        onClick={handleRightSideButtonClick}
      />
    </div>
  );
};

const wrapper = css`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: ${BOTTOM_NAVIGATION_HEIGHT};
  background-color: ${colors.white};
  border-top: 1px solid ${colors.grayline2};
`;

export default BottomNaviagtion;
