import { css } from '@emotion/react';
import { useState } from 'react';
import { postComment } from '@/api/board';
import Input from '@/components/Input';
import Send from '@/public/assets/svg/send.svg';
import { colors } from '@/styles/colors';

interface Props {
  postId: number;
  onReload: () => void;
}

const CommentInput = ({ postId, onReload }: Props) => {
  const [comment, setComment] = useState('');

  const handleSubmitIconClick = async () => {
    await postComment({
      comment_post: postId,
      username: '익명',
      content: comment,
    });
    setComment('');
    onReload();
  };

  return (
    <div css={wrapper}>
      <Input
        value={comment}
        onChange={setComment}
        placeholder="댓글을 입력하세요"
      />
      <Send width="32" onClick={handleSubmitIconClick} />
    </div>
  );
};

const wrapper = css`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  background-color: ${colors.white};
  padding: 0.5rem 1rem;

  & > div {
    flex: 1;
  }
`;

export default CommentInput;
