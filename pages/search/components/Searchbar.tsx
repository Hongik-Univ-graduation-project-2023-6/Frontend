import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Text from '@/components/Text';
import Search from '@/public/assets/svg/search.svg';
import { colors } from '@/styles/colors';

const Searchbar = () => {
  const router = useRouter();
  const handleCancelButtonClick = () => {
    router.back();
  };

  return (
    <div css={wrapper}>
      <div css={inputArea}>
        <Search />
        <input type="text" placeholder="글 제목, 내용" />
      </div>
      <Text weight="bold" size="md" onClick={handleCancelButtonClick}>
        취소
      </Text>
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
  gap: 0.5rem;
  width: 100%;
  height: 3rem;
  padding: 0.75rem 1rem;
  background-color: ${colors.white};
  z-index: 900;

  & > div:first-of-type {
    width: 100%;
  }
`;

const inputArea = css`
  flex: 1;
  position: relative;
  display: flex;
  background-color: ${colors.greenbox2};
  border-radius: 0.75rem;
  height: 2rem;

  svg {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
  }

  input {
    width: 100%;
    background-color: transparent;
    border: none;
    font-weight: 400;
    font-size: 12px;
    padding-left: 2.5rem;
  }
`;

export default Searchbar;
