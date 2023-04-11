import Searchbar from './components/Searchbar';
import BigSearch from '@/public/assets/svg/big_search.svg';
import Text from '@/Components/Text';
import { css } from '@emotion/react';
import { colors } from '@/styles/colors';

const SearchPage = () => {
  return (
    <div css={layout}>
      <Searchbar />
      <div css={contentArea}>
        <BigSearch />
        <Text weight="bold" size="md">
          커뮤니티의 글을 검색해보세요
        </Text>
      </div>
    </div>
  );
};

const layout = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 6rem 1rem;
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
