import { css } from '@emotion/react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { aiRequest } from '@/api/axios';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import { PATH } from '@/constants/path';
import Picture from '@/public/assets/svg/picture.svg';
import Search from '@/public/assets/svg/search.svg';
import { $diagnosisResultState } from '@/states/atoms/diagnosisResultState';

const ImageFileForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isWaitingForResponse = useRef(false);
  const cancelTokenSource = useRef(axios.CancelToken.source());
  const setDiagnosisResultState = useSetRecoilState($diagnosisResultState);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imageFile) return;

    const formdata = new FormData();
    formdata.append('file', imageFile);
    isWaitingForResponse.current = true;
    setShowSpinner(true);

    try {
      const response = await aiRequest(
        formdata,
        cancelTokenSource.current.token,
      );

      if (response) {
        setDiagnosisResultState({
          result: response,
          targetLeafImageSrc: thumbnailSrc,
        });
        router.push(PATH.DIAGNOSIS_RESULT);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled');
      } else {
        console.error(error);
      }
      setShowSpinner(false);
    } finally {
      isWaitingForResponse.current = false;
    }
  };

  const fileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
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

  const handleUploadButtonClick = () => {
    if (!fileInputRef) return;
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const cancelTokenSourceRef = cancelTokenSource.current;

    return () => {
      if (isWaitingForResponse.current) {
        cancelTokenSourceRef.cancel();
      }
    };
  }, []);

  return (
    <div css={wrapper}>
      {showSpinner ? (
        <Spinner />
      ) : (
        <form css={formArea} onSubmit={handleSubmit}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            css={none}
            onChange={fileInputChange}
          />
          {thumbnailSrc ? (
            <>
              <Image
                src={thumbnailSrc}
                width={200}
                height={200}
                alt="uploaded image"
              />
              <Button type="submit" label="진단하기" icon={<Search />} />
              <Button
                type="button"
                label={'사진 다시 선택하기'}
                onClick={handleUploadButtonClick}
                icon={<Picture />}
              />
            </>
          ) : (
            <Button
              type="button"
              label={'사진 선택하기'}
              onClick={handleUploadButtonClick}
              icon={<Picture />}
            />
          )}
        </form>
      )}
    </div>
  );
};

const wrapper = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const formArea = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  & > button {
    width: 80%;
    height: 2.75rem;
  }
`;

const none = css`
  display: none;
`;

export default ImageFileForm;
