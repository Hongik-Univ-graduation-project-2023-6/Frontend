import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { PATH } from '@/constants/path';
import ModalPortal from '@/ModalPortal';
import BigLogo from '@/public/assets/svg/big_logo.svg';
import X from '@/public/assets/svg/x.svg';
import { colors } from '@/styles/colors';
import Text from './Text';

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuModal = ({ showModal, setShowModal }: Props) => {
  const router = useRouter();
  if (!showModal) return null;

  const handleBackgroundClick = () => {
    setShowModal(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleCloseButtonclick = () => {
    setShowModal(false);
  };

  const handlePageButtonClick = (path: string) => {
    if (!path) return null;
    setShowModal(false);
    router.push(path);
  };

  return (
    <ModalPortal>
      <div css={background} onClick={handleBackgroundClick}>
        <div css={wrapper} onClick={handleMenuClick}>
          <div css={topArea}>
            <X onClick={handleCloseButtonclick} />
          </div>
          <div css={logoArea}>
            <BigLogo />
          </div>
          <div css={textArea}>
            <Text
              weight="bold"
              size="lg"
              onClick={() => handlePageButtonClick(PATH.MAIN)}
            >
              커뮤니티
            </Text>
            <Text
              weight="bold"
              size="lg"
              onClick={() => handlePageButtonClick(PATH.DIAGNOSIS)}
            >
              AI 진단
            </Text>
            <Text weight="bold" size="lg">
              About
            </Text>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

const background = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  width: 75%;
  height: 100%;
  padding: 1.25rem;
  background-color: ${colors.greenbox3};
`;

const topArea = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const logoArea = css`
  display: flex;
  justify-content: center;
`;

const textArea = css`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
`;

export default MenuModal;
