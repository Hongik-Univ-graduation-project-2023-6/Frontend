import { fontSize, fontWeight } from '@/constants/fonts';
import { fontSizeType, fontWeightType } from '@/types/fonts';

interface Props {
  children: string | number;
  weight: fontWeightType;
  size: fontSizeType;
  onClick?: () => void;
}

const Text = ({ size, weight, children, onClick }: Props) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <p
      css={{ fontSize: fontSize[size], fontWeight: fontWeight[weight] }}
      onClick={handleClick}
    >
      {children}
    </p>
  );
};

export default Text;
