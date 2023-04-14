import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HEADER_HEIGHT } from '@/constants/layout';
import { PATH } from '@/constants/path';
import LeftArrow from '@/public/assets/svg/left_arrow.svg';
import Logo from '@/public/assets/svg/logo.svg';
import Menu from '@/public/assets/svg/menu.svg';
import Search from '@/public/assets/svg/search.svg';
import { colors } from '@/styles/colors';
import MenuModal from './MenuModal';

interface Props {
  showPrevButton?: boolean;
  showSearchButton?: boolean;
  showMenuButton?: boolean;
}

const Header = ({
  showPrevButton,
  showSearchButton,
  showMenuButton,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleLeftSideButtonClick = () => {
    showPrevButton && router.back();
    showMenuButton && setShowModal(true);
  };

  const handleRightSideButtonClick = () => {
    showSearchButton && router.push(PATH.SEARCH);
  };

  return (
    <header css={wrapper}>
      <MenuModal showModal={showModal} setShowModal={setShowModal} />
      <div onClick={handleLeftSideButtonClick}>
        {showPrevButton && <LeftArrow />}
        {showMenuButton && <Menu />}
      </div>
      <Logo className="logo" />
      <div onClick={handleRightSideButtonClick}>
        {showSearchButton && <Search />}
      </div>
    </header>
  );
};

const wrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${HEADER_HEIGHT};
  background-color: ${colors.white};
  z-index: 900;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${HEADER_HEIGHT};
    height: ${HEADER_HEIGHT};
  }

  & > svg.logo {
    position: absolute;
    top: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default Header;
