import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Text from '@/components/Text';
import Profile from '@/public/assets/svg/profile.svg';
import { colors } from '@/styles/colors';
import { IComment } from '@/types/board';

interface Props {
  commentList: IComment[];
}

const CommentViewer = ({ commentList }: Props) => {
  return (
    <ViewerWrap>
      {commentList.map((comment) => (
        <Comment key={comment.id}>
          <UserInfoArea>
            <Profile />
            <Text weight="bold" size="md">
              @{comment.username}
            </Text>
          </UserInfoArea>
          <Text weight="regular" size="md">
            {comment.content}
          </Text>
          <Text weight="regular" size="sm">
            {dayjs(comment.created_at).format('MM/DD HH:mm')}
          </Text>
        </Comment>
      ))}
    </ViewerWrap>
  );
};

const ViewerWrap = styled.ul`
  list-style: none;

  & > li:not(:last-of-type) {
    border-bottom: 1px solid ${colors.grayline2};
  }
`;

const Comment = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

const UserInfoArea = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export default CommentViewer;
