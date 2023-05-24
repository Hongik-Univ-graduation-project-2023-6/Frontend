import { css } from '@emotion/react';
import Text from '@/components/Text';
import Ban from '@/public/assets/svg/ban.svg';
import { colors } from '@/styles/colors';

const InvalidLeafInfo = () => {
  return (
    <div css={wrapper}>
      <Ban stroke={colors.graytext2} />
      <Text size="lg" weight="regular">
        식물 잎 이미지가 아닌 것 같습니다.
      </Text>
    </div>
  );
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default InvalidLeafInfo;
