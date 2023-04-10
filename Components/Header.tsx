import { css } from '@emotion/react';
import Menu from '@/public/assets/svg/menu.svg';
import Logo from '@/public/assets/svg/logo.svg';
import Search from '@/public/assets/svg/search.svg';
import { color } from '@/styles/color';

const Header = () => {
  return (
    <div css={Wrapper}>
      <Menu />
      <Logo />
      <Search />
    </div>
  );
};

const Wrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 3.5rem 1rem 0.75rem;
  background-color: ${color.white};
`;

export default Header;
