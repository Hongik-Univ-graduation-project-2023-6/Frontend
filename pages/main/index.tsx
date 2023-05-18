import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { boardRequest } from '@/api/axios';
import BottomNaviagtion from '@/components/BottomNavigation';
import Button from '@/components/Button';
import Header from '@/components/Header';
import {
  BOTTOM_NAVIGATION_HEIGHT,
  HEADER_HEIGHT,
  SIDE_PADDING,
} from '@/constants/layout';
import { PATH } from '@/constants/path';
import Pencil from '@/public/assets/svg/pencil.svg';
import { IGetPost } from '@/types/api';
import { IPost } from '@/types/board';
import Post from './components/Post';

interface Props {
  data: IPost[];
}

const MainPage = ({ data }: Props) => {
  const router = useRouter();

  const handleWriteButtonClick = () => {
    router.push(PATH.WRITE);
  };

  return (
    <div css={layout}>
      <Header showSearchButton={true} />
      {data.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.username}
          date={post.created_at}
          title={post.title}
          content={post.content}
          commentCount={post.comments_count}
          images={post.post_images}
        />
      ))}
      <Button
        type="button"
        label="글쓰기"
        onClick={handleWriteButtonClick}
        icon={<Pencil />}
      />
      <BottomNaviagtion />
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await boardRequest<IGetPost>({
    method: 'get',
    url: '/post/',
  });
  const data = res.data.results;

  return { props: { data } };
};

const layout = css`
  display: flex;
  flex-direction: column;
  padding: ${HEADER_HEIGHT} ${SIDE_PADDING}
    calc(${BOTTOM_NAVIGATION_HEIGHT} + 1rem);

  & > button {
    position: fixed;
    left: 50%;
    bottom: calc(${BOTTOM_NAVIGATION_HEIGHT} + 0.75rem);
    transform: translateX(-50%);
    border-radius: 1.5rem;
  }
`;

export default MainPage;
