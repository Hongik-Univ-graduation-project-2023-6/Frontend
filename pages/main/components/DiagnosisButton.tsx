import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Text from '@/components/Text';
import { PATH } from '@/constants/path';
import { colors } from '@/styles/colors';
import leaves from '../../../public/assets/img/leaves.webp';

const DiagnosisButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(PATH.DIAGNOSIS);
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
