import { css } from '@emotion/react';
import Image from 'next/image';
import Header from '@/components/Header';
import Text from '@/components/Text';
import Like from '@/public/assets/svg/like.svg';
import Profile from '@/public/assets/svg/profile.svg';
import Scrape from '@/public/assets/svg/scrape.svg';
import { colors } from '@/styles/colors';

const DATA = {
  id: '1',
  userName: '익명',
  date: '01/01',
  title: '샘플 제목입니다',
  content: '샘플 텍스트입니다.',
  like: 4,
  scrape: 2,
  images: ['https://picsum.photos/seed/1000/500/500'],
};

const ViewPage = () => {
  return (
    <div css={layout}>
      <Header showPrevButton={true} />
      <div css={topArea}>
        <Profile />
        <div>
          <Text weight="bold" size="sm">
            {DATA.userName}
          </Text>
          <Text weight="regular" size="xs">
            {DATA.date}
          </Text>
        </div>
      </div>
      <div css={contentArea}>
        <Text weight="bold" size="md">
          {DATA.title}
        </Text>
        <Text weight="regular" size="sm">
          {DATA.content}
        </Text>
      </div>
      {DATA.images && (
        <div css={imageArea}>
          <Image src={DATA.images[0]} alt="uploaded image" fill={true} />
        </div>
      )}
      <div css={bottomArea}>
        <div className="bottomIcon">
          <Like />
          <Text weight="bold" size="xs">
            {DATA.like}
          </Text>
        </div>
        <div className="bottomIcon">
          <Scrape />
          <Text weight="bold" size="xs">
            {DATA.scrape}
          </Text>
        </div>
      </div>
    </div>
  );
};

const layout = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3rem 1rem;
`;

const topArea = css`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  & > p:first-of-type {
    color: ${colors.black};
  }

  & > p:last-of-type {
    color: ${colors.graytext2};
  }
`;

const contentArea = css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;

  & > p:first-of-type {
    color: ${colors.black};
  }

  & > p:last-of-type {
    color: ${colors.graytext3};
  }
`;

const imageArea = css`
  display: flex;
  position: relative;
  width: 100%;
  height: 14.5rem;
  margin-bottom: 0.5rem;
`;

const bottomArea = css`
  display: flex;
  gap: 1.5rem;
  color: ${colors.graytext2};

  div.bottomIcon {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

export default ViewPage;
