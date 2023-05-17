import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import BottomNaviagtion from '@/components/BottomNavigation';
import Button from '@/components/Button';
import Header from '@/components/Header';
import {
  BOTTOM_NAVIGATION_HEIGHT,
  HEADER_HEIGHT,
  SIDE_PADDING,
} from '@/constants/layout';
import { PATH } from '@/constants/path';
import LeafSample1 from '@/public/assets/img/leaf2.jpg';
import LeafSample2 from '@/public/assets/img/leaf3.jpg';
import LeafSample3 from '@/public/assets/img/leaves.webp';
import Pencil from '@/public/assets/svg/pencil.svg';
import Post from './components/Post';

const DATA = [
  {
    id: '1',
    userName: '익명',
    date: '01/01',
    title: '안녕하세요',
    content: 'fasdfasfsdafsdafasdfsadfsafsdaf',
    like: 4,
    commentCount: 1,
    images: [LeafSample1],
  },
  // {
  //   id: '2',
  //   userName: '익명',
  //   date: '01/01',
  //   title: '안녕하세요fdasfdasfasf',
  //   content:
  //     'fasdfasfsdafsdafasdfsfasdfasfsdafsdafasdffasdfasfsdafsdafasdfsfsdfdafsafadfsafsdafsfsdfdafsafadfsafsdaffasdfasfsdafsdafasdfsfsdfdafsafadfsafsdaffasdfasfsdafsdafasdfsfsdfdafsafadfsafsdaffsdfdafsafadfsafsdaf',
  //   like: 4,
  //   scrape: 2,
  //   images: [LeafSample1, LeafSample2, LeafSample3],
  // },
  {
    id: '3',
    userName: '익명',
    date: '01/01',
    title: '안녕하세요',
    content: 'fasdfasfsdafsdafasdfsadfsafsdaf',
    like: 4,
    commentCount: 2,
    images: [LeafSample2, LeafSample3],
  },
  {
    id: '4',
    userName: '익명',
    date: '01/01',
    title: '안녕하세요',
    content: 'fasdfasfsdafsdafasdfsadfsafsdaf',
    like: 4,
    commentCount: 4,
    images: [],
  },
];

const MainPage = () => {
  const router = useRouter();

  const handleWriteButtonClick = () => {
    router.push(PATH.WRITE);
  };

  return (
    <div css={layout}>
      <Header showSearchButton={true} />
      {DATA.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          date={post.date}
          title={post.title}
          content={post.content}
          commentCount={post.commentCount}
          images={post.images}
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
