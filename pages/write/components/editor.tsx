import styled from '@emotion/styled';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { postPost } from '@/api/board';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import Textarea from '@/components/Textarea';
import { MAX_FILE_INPUT } from '@/constants/file';
import Camera from '@/public/assets/svg/camera.svg';
import { colors } from '@/styles/colors';

interface Props {
  onCancelButtonClick: () => void;
  onSubmitSuccess: () => void;
}

const Editor = ({ onCancelButtonClick, onSubmitSuccess }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagefileList, setImagefileList] = useState<File[]>([]);
  const [imagefileThumbSrcList, setImagefileThumbSrcList] = useState<string[]>(
    [],
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCancelButtonClick = () => {
    onCancelButtonClick();
  };

  const handleSubmitButtonClick = async () => {
    if (!title) {
      alert('제목을 입력하세요');
      return;
    }

    if (!content) {
      alert('내용을 입력하세요');
      return;
    }

    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', content);
    formdata.append('username', '익명');
    imagefileList.forEach((imagefile) =>
      formdata.append('post_images', imagefile),
    );

    try {
      const response = await postPost(formdata);
      if (response) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddImageIconClick = () => {
    if (!fileInputRef) return;
    if (imagefileList.length >= MAX_FILE_INPUT) {
      alert('업로드 할 수 있는 개수를 초과하였습니다');
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files?.length > MAX_FILE_INPUT)
      alert(`최대 ${MAX_FILE_INPUT}개의 사진만 업로드 할 수 있습니다`);

    const fileList = Array.from(event.target.files ?? []).slice(0, 4);

    if (fileList.length) {
      const validFileList = fileList.filter((file) =>
        file.type.startsWith('image/'),
      );

      setImagefileList((prev) => [...prev, ...validFileList]);
      validFileList.map((file) => {
        setImagefileThumbSrcList((prev) => [
          ...prev,
          URL.createObjectURL(file),
        ]);
      });
    }
  };

  const handleDeleteButtonClick = (index: number) => {
    setImagefileThumbSrcList((prev) => {
      const targetList = [...prev];
      targetList.splice(index, 1);
      return [...targetList];
    });

    setImagefileList((prev) => {
      const targetList = [...prev];
      targetList.splice(index, 1);
      return [...targetList];
    });
  };

  return (
    <EditorWrap>
      <InputArea>
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={setTitle}
        />
        <Textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={setContent}
        />
      </InputArea>
      <ImageArea>
        <ImageInputIcon onClick={handleAddImageIconClick}>
          <Camera />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            multiple
          />
          <Text weight="regular" size="xs">
            {imagefileList.length} / {MAX_FILE_INPUT}
          </Text>
        </ImageInputIcon>
        {!!imagefileThumbSrcList.length &&
          imagefileThumbSrcList.map((imgSrc, index) => (
            <ImageItem key={index}>
              <Image src={imgSrc} alt="uploaded image" width={52} height={52} />
              <DeleteIcon onClick={() => handleDeleteButtonClick(index)} />
            </ImageItem>
          ))}
      </ImageArea>
      <Bar />
      <ButtonArea>
        <Button type="button" label="취소" onClick={handleCancelButtonClick} />
        <Button type="button" label="등록" onClick={handleSubmitButtonClick} />
      </ButtonArea>
    </EditorWrap>
  );
};

const EditorWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ImageArea = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  padding-bottom: 0.75rem;
`;

const ImageInputIcon = styled.div`
  position: relative;
  box-sizing: border-box;
  justify-self: center;
  width: 3.25rem;
  height: 3.25rem;
  border: 1px solid ${colors.greenbox2};
  border-radius: 0.5rem;

  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & > input {
    display: none;
  }

  & > p {
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ImageItem = styled.div`
  position: relative;
  box-sizing: border-box;
  justify-self: center;

  & > img {
    border-radius: 0.5rem;
  }
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  color: ${colors.white};
  background-color: ${colors.black};
  border-radius: 50%;

  &::before {
    content: 'X';
  }
`;

const Bar = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.grayline2};
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Editor;
