import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { boardRequest } from '@/api/axios';
import Header from '@/components/Header';
import {
  COMMENT_INPUT_HEIGHT,
  HEADER_HEIGHT,
  SIDE_PADDING,
} from '@/constants/layout';
import { IDetailPost } from '@/types/board';
import CommentInput from './components/CommentInput';
import CommentViewer from './components/CommentViewer';
import PostViewer from './components/PostViewer';

interface Props {
  data: IDetailPost;
}

const ViewPage = ({ data }: Props) => {
  const router = useRouter();

  const handleReload = () => {
    router.reload();
  };

  return (
    <div css={layout}>
      <Header showPrevButton={true} />
      <PostViewer
        title={data.title}
        content={data.content}
        username={data.username}
        date={data.created_at}
        commentCount={data.comments_count}
        images={data.post_images}
      />
      <CommentViewer commentList={data.post_comments} />
      <CommentInput postId={data.id} onReload={handleReload} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const res = await boardRequest({
      method: 'get',
      url: `/post/${id}`,
    });
    const data = res.data;

    return { props: { data } };
  } catch (error) {
    console.error(error);

    return { props: {} };
  }
};

const layout = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${HEADER_HEIGHT} ${SIDE_PADDING} ${COMMENT_INPUT_HEIGHT};
`;

export default ViewPage;
