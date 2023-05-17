import { css } from '@emotion/react';
import { SetStateAction } from 'react';
import { colors } from '@/styles/colors';

interface Props {
  value: string;
  onChange: React.Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

const Input = ({ value, onChange, placeholder }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div css={wrapper}>
      <input placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  );
};

const wrapper = css`
  border: 2px solid ${colors.greenbox2};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  input {
    width: 100%;
    border: none;
    background-color: transparent;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: ${colors.graytext2};
  }
`;

export default Input;
