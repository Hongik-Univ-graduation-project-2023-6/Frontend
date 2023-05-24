import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { boardRequest } from '@/api/axios';
import { getNextPost } from '@/api/board';
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
import { getPageNumber } from '../../utils/getPageNumber';

interface Props {
  data: IPost[];
  nextPageNumber: string | null;
}

const MainPage = ({ data, nextPageNumber }: Props) => {
  const [postList, setPostList] = useState<IPost[]>([]);
  const nextPageNumberRef = useRef(nextPageNumber);
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleWriteButtonClick = () => {
    router.push(PATH.WRITE);
  };

  useEffect(() => {
    setPostList([...data]);
  }, [data]);

  useEffect(() => {
    const endpointRef = divRef.current;
    if (!endpointRef) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting && nextPageNumberRef.current) {
          const nextData = await getNextPost(nextPageNumberRef.current);

          nextPageNumberRef.current = nextData.next
            ? getPageNumber(nextData.next)[0]
            : null;
          setPostList((prev) => [...prev, ...nextData.results]);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(endpointRef);

    return () => {
      observer.unobserve(endpointRef);
    };
  }, []);

  return (
    <div css={layout}>
      <Header showSearchButton={true} />
      <div>
        {postList.map((post) => (
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
        <div ref={divRef} />
      </div>
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
  try {
    const res = await boardRequest<IGetPost>({
      method: 'get',
      url: '/post/',
    });
    const data = res.data.results;
    const nextPageNumber = res.data.next
      ? getPageNumber(res.data.next)[0]
      : null;

    return { props: { data, nextPageNumber } };
  } catch (error) {
    console.error(error);

    return { props: {} };
  }
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
