import { css } from '@emotion/react';
import { colors } from '@/styles/colors';

const Spinner = () => {
  return <div css={wrapper}></div>;
};

const wrapper = css`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 0.5rem solid transparent;
  border-left-color: ${colors.greenbox3};
  border-right-color: ${colors.greenbox3};
  animation: spin 1s ease infinite;
`;

export default Spinner;
