import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import Image from 'next/image';
import Text from './Text';

/**
 * @description
 * children 속성을 통해 버튼 내 svg 파일을 출력할 수 있습니다.
 */

interface Props {
  text: string;
  children?: any;
  onClick: () => void;
}

const Button = ({ text, children, onClick }: Props) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button css={wrapper} onClick={handleClick}>
      {children && <div>{children}</div>}
      <Text weight="bold" size="sm">
        {text}
      </Text>
    </button>
  );
};

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  min-width: 4.75rem;
  min-height: 2rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background-color: ${colors.greenbox1};
  color: ${colors.graytext1};
`;

export default Button;
