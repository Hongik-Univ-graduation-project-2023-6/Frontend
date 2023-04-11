import { css } from '@emotion/react';
import leaves from '../../../public/assets/img/leaves.webp';
import { colors } from '@/styles/colors';
import Text from '@/Components/Text';

interface Props {
  onClick: () => void;
}

const DiagnosisButton = ({ onClick }: Props) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div css={wrapper} onClick={handleClick}>
      <Text weight="bold" size="md">
        AI 진단 바로가기
      </Text>
    </div>
  );
};

const wrapper = css`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 5.5rem;
  background-image: url(${leaves.src});
  object-fit: cover;
  border-radius: 0.75rem;

  & > p {
    color: ${colors.white};
    margin-right: 2.75rem;
  }
`;

export default DiagnosisButton;