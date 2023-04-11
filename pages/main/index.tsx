import Button from '@/Components/Button';
import Header from '@/Components/Header';
import { css } from '@emotion/react';
import DiagnosisButton from './components/DiagnosisButton';
import Post from './components/Post';
import Pencil from '@/public/assets/svg/pencil.svg';
import { useRouter } from 'next/router';
import { PATH } from '@/constants/path';

const DATA = [
  {
    id: '1',
    userName: '익명',
    date: '01/01',
    title: '안녕하세요',
    content: 'fasdfasfsdafsdafasdfsadfsafsdaf',
    like: 4,
    scrape: 2,
    images: ['https://picsum.photos/seed/1000/500/500'],
  },
  {
    id: '2',
    userName: '익명',
    date: '01/01',
    title: '안녕하세요fdasfdasfasf',
    content:
      'fasdfasfsdafsdafasdfsfasdfasfsdafsdafasdffasdfasfsdafsdafasdfsfsdfdafsafadfsafsdafsfsdfdafsafadfsafsdaffasdfasfsdafsdafasdfsfsdfdafsafadfsafsdaffasdfasfsdafsdafasdfsfsdfdafsafadfsafsdaffsdfdafsafadfsafsdaf',
    like: 4,
    scrape: 2,
    images: [
      'https://picsum.photos/seed/100/500/500',
      'https://picsum.photos/seed/400/500/500',
      'https://picsum.photos/seed/600/500/500',
    ],
  },
  {
    id: '3',
    userName: '익명',
    date: '01/01',
    title: '안녕하세요',
    content: 'fasdfasfsdafsdafasdfsadfsafsdaf',
    like: 4,
    scrape: 2,
    images: [
      'https://picsum.photos/seed/600/500/500',
      'https://picsum.photos/seed/900/500/500',
    ],
  },
  {
    id: '4',
    userName: '익명',
    date: '01/01',
    title: '안녕하세요',
    content: 'fasdfasfsdafsdafasdfsadfsafsdaf',
    like: 4,
    scrape: 2,
    images: [],
  },
];

const MainPage = () => {
  const router = useRouter();

  const handleWriteButtonClick = () => {
    // router.push(PATH.WRITE);
  };

  return (
    <div css={layout}>
      <Header showSearchButton={true} />
      <DiagnosisButton />
      {DATA.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          date={post.date}
          title={post.title}
          content={post.content}
          like={post.like}
          scrape={post.scrape}
          images={post.images}
        />
      ))}
      <div css={buttonArea}>
        <Button text="글쓰기" onClick={handleWriteButtonClick}>
          <Pencil />
        </Button>
      </div>
    </div>
  );
};

const layout = css`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 6rem 1rem;
`;

const buttonArea = css`
  position: fixed;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);

  button {
    border-radius: 1.5rem;
  }
`;

export default MainPage;
