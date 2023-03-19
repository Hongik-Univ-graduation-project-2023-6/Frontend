import Header from '@/Components/Header';
import { css } from '@emotion/react';
import DiagnosisButton from './components/DiagnosisButton';
import Post from './components/Post';

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
  return (
    <div css={layout}>
      <Header />
      <DiagnosisButton onClick={() => null} />
      {DATA.map((post) => (
        <Post
          key={post.id}
          userName={post.userName}
          date={post.date}
          title={post.title}
          content={post.content}
          like={post.like}
          scrape={post.scrape}
          images={post.images}
        />
      ))}
    </div>
  );
};

const layout = css`
  display: flex;
  flex-direction: column;

  padding: 6rem 1rem;
`;

export default MainPage;
