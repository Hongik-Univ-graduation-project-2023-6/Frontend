import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Image from 'next/image';
import Text from '@/components/Text';
import Comment from '@/public/assets/svg/comment.svg';
import Profile from '@/public/assets/svg/profile.svg';
import { IImage } from '@/types/board';

interface Props {
  title: string;
  content: string;
  username: string;
  date: Date;
  images: IImage[];
  commentCount: number;
}

const PostViewer = ({
  title,
  content,
  username,
  date,
  commentCount,
  images,
}: Props) => {
  return (
    <ViewerWrap>
      <PublisherInfoArea>
        <Profile width="30" height="30" />
        <div>
          <Text weight="bold" size="md">
            @{username}
          </Text>
          <Text weight="regular" size="sm">
            {dayjs(date).format('MM/DD HH:mm')}
          </Text>
        </div>
      </PublisherInfoArea>
      <ContentArea>
        <Text weight="bold" size="lg">
          {title}
        </Text>
        <Text weight="regular" size="md">
          {content}
        </Text>
      </ContentArea>
      <ImageArea>
        {images.map((image) => (
          <div key={image.id}>
            <Image
              src={image.image_file}
              alt="uploaded image"
              width="100"
              height="100"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </ImageArea>
      <CommentInfoArea>
        <Comment />
        <Text weight="bold" size="md">
          {commentCount}
        </Text>
      </CommentInfoArea>
    </ViewerWrap>
  );
};

const ViewerWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
`;

const PublisherInfoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ImageArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & img {
    border-radius: 0.5rem;
  }
`;

const CommentInfoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export default PostViewer;
