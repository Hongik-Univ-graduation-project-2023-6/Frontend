import { css } from '@emotion/react';
import { ReactElement } from 'react';
import Text from '@/components/Text';
import { colors } from '@/styles/colors';

interface Props {
  label: string;
  icon: ReactElement;
  onClick: () => void;
}

/**
 * @param label 버튼 하단에 표시될 label text 입니다.
 * @param icon 버튼에 표시될 아이콘 이미지 입니다. react element가 들어와야 됩니다.
 * @param onClick 버튼이 클릭되었을 때 발생할 이벤트입니다.
 */

const NavigationButton = ({ label, icon, onClick }: Props) => {
  const handleButtonClick = () => {
    onClick();
  };

  return (
    <button type="button" css={wrapper} onClick={handleButtonClick}>
      <div>{icon}</div>
      <Text weight="regular" size="xs">
        {label}
      </Text>
    </button>
  );
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 3rem;

  p {
    color: ${colors.graytext4};
  }
`;

export default NavigationButton;
