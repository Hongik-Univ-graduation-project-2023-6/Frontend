import { fontSize, fontWeight } from '@/constants/fonts';
import { fontSizeType, fontWeightType } from '@/types/fonts';

interface Props {
  children: string | number;
  weight: fontWeightType;
  size: fontSizeType;
}

const Text = ({ size, weight, children }: Props) => {
  return (
    <p css={{ fontSize: fontSize[size], fontWeight: fontWeight[weight] }}>
      {children}
    </p>
  );
};

export default Text;
