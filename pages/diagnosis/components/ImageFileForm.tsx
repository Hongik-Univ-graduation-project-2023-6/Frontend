import { css } from '@emotion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { aiRequest } from '@/api/axios';
import Button from '@/components/Button';
import Picture from '@/public/assets/svg/picture.svg';
import Search from '@/public/assets/svg/search.svg';

const ImageFileForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  //임시
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imageFile) return;

    const formdata = new FormData();
    formdata.append('image', imageFile);
    console.log(process.env.NEXT_PUBLIC_AI_SERVER_URL);
    try {
      const response = await aiRequest({
        method: 'post',
        url: '/inference/',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
    } catch (error) {
      console.error(error);
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

  return (
    <form css={wrapper} onSubmit={handleSubmit}>
      {thumbnailSrc && (
        <Image
          src={thumbnailSrc}
          width={200}
          height={200}
          alt="uploaded image"
        />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        css={none}
        onChange={fileInputChange}
      />
      {thumbnailSrc && (
        <Button type="submit" label="진단하기" icon={<Search />} />
      )}
      <Button
        type="button"
        label={`사진 ${thumbnailSrc ? `다시 ` : ``}선택하기`}
        onClick={handleUploadButtonClick}
        icon={<Picture />}
      />
    </form>
  );
};

const wrapper = css`
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
