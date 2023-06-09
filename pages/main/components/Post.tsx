import { css } from '@emotion/react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Text from '@/components/Text';
import { PATH } from '@/constants/path';
import Comment from '@/public/assets/svg/comment.svg';
import { colors } from '@/styles/colors';
import { IImage } from '@/types/board';

interface Props {
  id: number;
  userName: string;
  date: Date;
  title: string;
  content: string;
  commentCount: number;
  images: IImage[];
}

const Post = ({
  id,
  userName,
  date,
  title,
  content,
  commentCount,
  images,
}: Props) => {
  const imageClass = classNames({
    more: images?.length > 2,
    double: images?.length === 2,
    single: images?.length === 1,
    none: images?.length === 0,
  });

  const router = useRouter();

  const handlePostClick = (id: string) => {
    router.push(`${PATH.VIEW}/${id}`);
  };

  return (
    <div css={wrapper} onClick={() => handlePostClick(id.toString())}>
      <div css={topArea}>
        <Text size="md" weight="regular">
          @{userName}
        </Text>
        <Text size="xs" weight="regular">
          {dayjs(date).format('MM/DD')}
        </Text>
      </div>
      <div css={contentArea}>
        <Text size="lg" weight="bold">
          {title}
        </Text>
        <Text size="md" weight="regular">
          {content}
        </Text>
      </div>

      {(imageClass === 'more' || imageClass === 'double') && (
        <div className={imageClass} css={imageArea}>
          <div>
            <Image
              src={images[0].image_file}
              alt="uploaded image"
              fill={true}
              sizes="50%"
              priority={false}
            />
          </div>
          <div className={imageClass === 'more' ? 'seeMore' : ''}>
            {imageClass === 'more' && (
              <Text weight="bold" size="xs">
                이미지 더 보기
              </Text>
            )}
            <Image
              src={images[1].image_file}
              alt="uploaded image"
              fill={true}
              sizes="50%"
              priority={false}
            />
          </div>
        </div>
      )}

      {imageClass === 'single' && (
        <div className={imageClass} css={imageArea}>
          <div>
            <Image
              src={images[0].image_file}
              alt="uploaded image"
              fill={true}
              sizes="100%"
              priority={false}
            />
          </div>
        </div>
      )}

      <div css={bottomArea}>
        <div className="bottomIcon">
          <Comment />
          <Text size="md" weight="bold">
            {commentCount}
          </Text>
        </div>
      </div>
    </div>
  );
};

const wrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.75rem 0 1.5rem;
  border-bottom: 1px solid ${colors.grayline1};
  z-index: 0;
`;

const topArea = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  & > p:first-of-type {
    color: ${colors.graytext1};
  }

  & > p:last-of-type {
    color: ${colors.graytext2};
  }
`;

const contentArea = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;

  & > p:first-of-type {
    color: ${colors.black};
  }

  & > p:last-of-type {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${colors.graytext3};
  }
`;

const bottomArea = css`
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
  color: ${colors.graytext2};

  div.bottomIcon {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const imageArea = css`
  width: 100%;
  margin-bottom: 0.75rem;

  div {
    position: relative;
    width: 100%;

    img {
      border-radius: 0.75rem;
    }
  }

  div.seeMore {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.white};

    img {
      filter: brightness(0.4);
      z-index: -1;
    }
  }

  &.double,
  &.more {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 0.5rem;
    height: 9.25rem;
  }

  &.single {
    display: flex;
    height: 12.25rem;
  }
`;

export default Post;
