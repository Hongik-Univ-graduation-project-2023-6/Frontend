import { css } from '@emotion/react';
import Menu from '@/public/assets/svg/menu.svg';
import Logo from '@/public/assets/svg/logo.svg';
import Search from '@/public/assets/svg/search.svg';
import { colors } from '@/styles/colors';

const Header = () => {
  return (
    <div css={wrapper}>
      <Menu />
      <Logo />
      <Search />
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
  padding: 3.5rem 1rem 0.75rem;
  background-color: ${colors.white};
  z-index: 999;
`;

export default Header;
