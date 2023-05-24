import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { getSearchedNextPost, getSearchedPost } from '@/api/board';
import Text from '@/components/Text';
import { HEADER_HEIGHT, SIDE_PADDING } from '@/constants/layout';
import BigSearch from '@/public/assets/svg/big_search.svg';
import { colors } from '@/styles/colors';
import { IPost } from '@/types/board';
import { getPageNumber } from '@/utils/getPageNumber';
import Searchbar from './components/Searchbar';
import Post from '../main/components/Post';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [postList, setPostList] = useState<IPost[]>([]);
  const nextPageNumberRef = useRef<string | null>('');
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchValue) return;

    const showSearchedPost = async () => {
      const result = await getSearchedPost(searchValue);

      nextPageNumberRef.current = result.next
        ? getPageNumber(result.next)[0]
        : null;
      setPostList([...result.results]);
    };

    showSearchedPost();
  }, [searchValue]);

  useEffect(() => {
    const endpointRef = divRef.current;
    if (!endpointRef) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting && nextPageNumberRef.current) {
          const nextData = await getSearchedNextPost(
            searchValue,
            nextPageNumberRef.current,
          );
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
  }, [searchValue]);

  return (
    <div css={layout}>
      <Searchbar setSearchValue={setSearchValue} />
      {postList.length ? (
        postList.map((post) => (
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
        ))
      ) : (
        <div css={contentArea}>
          <BigSearch />
          <Text weight="bold" size="md">
            커뮤니티의 글을 검색해보세요
          </Text>
        </div>
      )}
      <div ref={divRef} />
    </div>
  );
};

const layout = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: ${HEADER_HEIGHT} ${SIDE_PADDING} 0;
`;

const contentArea = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
  color: ${colors.graytext2};
`;

export default SearchPage;
