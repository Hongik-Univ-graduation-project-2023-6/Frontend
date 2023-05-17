import { css } from '@emotion/react';
import { SetStateAction } from 'react';
import { colors } from '@/styles/colors';

interface Props {
  value: string;
  onChange: React.Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

const Textarea = ({ value, onChange, placeholder }: Props) => {
  const handleChage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div css={wrapper}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={handleChage}
      />
    </div>
  );
};

const wrapper = css`
  border: 2px solid ${colors.greenbox2};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  min-height: 17rem;

  textarea {
    width: 100%;
    height: 100%;
    resize: none;
    background-color: transparent;
    border: none;
  }

  textarea:focus {
    outline: none;
  }

  textarea::placeholder {
    color: ${colors.graytext2};
  }
`;

export default Textarea;
