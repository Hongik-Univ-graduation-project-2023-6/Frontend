import { css } from '@emotion/react';
import leaf from '@/public/assets/img/leaf.webp';
import Image from 'next/image';
import Text from '@/Components/Text';
import Header from '@/Components/Header';
import { colors } from '@/styles/colors';
import Button from '@/Components/Button';
import Camera from '@/public/assets/svg/camera.svg';
import Picture from '@/public/assets/svg/picture.svg';
import Search from '@/public/assets/svg/search.svg';

import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { PATH } from '@/constants/path';

const DiagnosisPage = () => {
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDiagnosisButtonClick = () => {
    router.push(`${PATH.DIAGNOSIS_RESULT}`);
  };

  const handleUploadButtonClick = () => {
    if (!fileInputRef) return;
    fileInputRef.current?.click();
  };

  const fileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString();
        setThumbnailSrc(base64String ?? '');
      };

      reader.readAsDataURL(file);
    } else {
      alert('이미지 파일만 업로드 가능합니다.');
    }
  };

  return (
    <div css={layout}>
      <Header showPrevButton={true} />
      <div css={imageArea}>
        <Image src={leaf.src} alt="leaf image" fill={true} priority={true} />
      </div>
      <div css={textArea}>
        <Text weight="bold" size="lg">
          식물 질병 진단 테스트
        </Text>
        <Text weight="bold" size="md">
          AI를 통해 식물의 건강 상태를 진단합니다
        </Text>
      </div>
      <div css={thumbnailArea}>
        {thumbnailSrc && (
          <Image
            src={thumbnailSrc}
            width={150}
            height={150}
            alt="uploaded image"
          />
        )}
      </div>
      <div css={buttonArea}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          css={none}
          onChange={fileInputChange}
        />
        {thumbnailSrc && (
          <Button text="진단하기" onClick={handleDiagnosisButtonClick} />
        )}
        <Button
          text={`사진 ${thumbnailSrc ? `다시 ` : ``}선택하기`}
          onClick={handleUploadButtonClick}
        >
          <Picture />
        </Button>
      </div>
    </div>
  );
};

const layout = css`
  display: flex;
  flex-direction: column;
  padding: 6rem 1rem;
  gap: 2rem;
`;

const imageArea = css`
  position: relative;
  width: 100%;
  height: 9.75rem;
`;

const textArea = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  & > p:first-of-type {
    color: ${colors.grayline1};
  }

  & > p:last-of-type {
    color: ${colors.graytext2};
  }
`;

const buttonArea = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  button {
    height: 2.75rem;
    flex-shrink: 0;
  }

  & > button:first-of-type {
    background-color: ${colors.greenbox3};
  }
`;

const none = css`
  display: none;
`;

const thumbnailArea = css`
  display: flex;
  justify-content: center;
`;

export default DiagnosisPage;
