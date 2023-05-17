import { css } from '@emotion/react';
import { ReactElement } from 'react';
import { colors } from '@/styles/colors';
import Text from './Text';

type ButtonType = 'submit' | 'button';

interface Props {
  type: ButtonType;
  label: string;
  icon?: ReactElement;
  onClick?: () => void;
}

/**
 * @param type 버튼의 타입입니다. submit과 button 중에서 선택 가능합니다.
 * @param label 버튼에 표시될 label text 입니다.
 * @param icon 버튼에 표시될 아이콘 이미지 입니다. react element가 들어와야 됩니다.
 * @param onClick 버튼이 클릭되었을 때 발생할 이벤트입니다.
 */

const Button = ({ type, label, icon, onClick }: Props) => {
  const handleButtonClick = () => {
    onClick && onClick();
  };

  return (
    <button type={type} css={wrapper} onClick={handleButtonClick}>
      {icon && <div>{icon}</div>}
      <Text weight="bold" size="md">
        {label}
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
