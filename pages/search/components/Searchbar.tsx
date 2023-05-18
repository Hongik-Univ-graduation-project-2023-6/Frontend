import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { SetStateAction, useRef, useState } from 'react';
import Text from '@/components/Text';
import Search from '@/public/assets/svg/search.svg';
import { colors } from '@/styles/colors';

interface Props {
  setSearchValue: React.Dispatch<SetStateAction<string>>;
}

const Searchbar = ({ setSearchValue }: Props) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleCancelButtonClick = () => {
    router.back();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      setSearchValue(value);
      inputRef.current?.blur();
    }
  };

  return (
    <div css={wrapper}>
      <div css={inputArea}>
        <Search />
        <input
          type="text"
          placeholder="글 제목, 내용"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
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
