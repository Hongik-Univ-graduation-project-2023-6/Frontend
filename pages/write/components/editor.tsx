import { css } from '@emotion/react';
import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { colors } from '@/styles/colors';

interface Props {
  onCancelButtonClick: () => void;
  onSubmitButtomClick: () => void;
}

const Editor = ({ onCancelButtonClick, onSubmitButtomClick }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCancelButtonClick = () => {
    onCancelButtonClick();
  };

  const handleSubmitButtonClick = () => {
    onSubmitButtomClick();
  };

  return (
    <div css={wrapper}>
      <div css={inputArea}>
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={setTitle}
        />
        <Textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={setContent}
        />
      </div>
      <div css={bar} />
      <div css={buttonArea}>
        <Button type="button" label="취소" onClick={handleCancelButtonClick} />
        <Button type="button" label="등록" onClick={handleSubmitButtonClick} />
      </div>
    </div>
  );
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const inputArea = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const bar = css`
  width: 100%;
  height: 1px;
  background-color: ${colors.grayline2};
`;

const buttonArea = css`
  display: flex;
  justify-content: space-between;
`;

export default Editor;
