import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
}

const Header = ({ showPrevButton, showSearchButton }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handlePrevButtonClick = () => {
    router.back();
  };

  const handleSearchButtonClick = () => {
    router.push(PATH.SEARCH);
  };

  const handleMenuButtonClick = () => {
    setShowModal(true);
  };

  return (
    <div css={wrapper}>
      <MenuModal showModal={showModal} setShowModal={setShowModal} />
      {showPrevButton ? (
        <LeftArrow onClick={handlePrevButtonClick} />
      ) : (
        <Menu onClick={handleMenuButtonClick} />
      )}
      <Logo />
      {showSearchButton && <Search onClick={handleSearchButtonClick} />}
    </div>
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
  height: 3rem;
  padding: 0.75rem 1rem;
  background-color: ${colors.white};
  z-index: 900;

  & > svg:nth-of-type(2) {
    position: absolute;
    top: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default Header;
