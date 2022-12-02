import {useState} from 'react';
import useFileUpload from './useFileUpload';
import MultipleImagePicker, {
  ImageResults,
  MediaType,
} from '@baronha/react-native-multiple-image-picker';
import {fileBase64} from 'src/utils/fileUtils';

export type FileObject = {
  fileName: string;
  uri: string;
  type: string;
  fileSize: number;
  base64: string;
  loading: boolean;
};

export enum AttachableRecord {
  Listing = 'listing',
}

export default function useImagesUpload({
  attachedRecord,
  fileLimit,
}: {
  attachedRecord: AttachableRecord;
  fileLimit: number;
}) {
  const [images, setImages] = useState<FileObject[]>([]);
  const [error, setError] = useState('');
  const {uploadFile} = useFileUpload({attachedRecord});
  const [selectedImages, setSelectedImages] = useState([]);
  const handleAddImages = async () => {
    try {
      const response = await (MultipleImagePicker.openPicker as Function)({
        selectedAssets: selectedImages,
        isExportThumbnail: true,
        usedCameraButton: false,
        isPreview: true,
        mediaType: 'image' as MediaType,
        maxSelectedAssets: fileLimit,
        isCrop: true,
        isCropCircle: true,
        doneTitle: '완료',
        cancelTitle: '취소',
        emptyMessage: '사진이 없습니다.',
        maximumMessageTitle: '사진 선택 오류',
        maximumMessage: `미디어는 ${fileLimit}개 이상 선택하실 수 없습니다.`,
        tapHereToChange: '사진첩 선택',
        selectedColor: '#3fcbaf',
      });
      const newFiles = await Promise.all(response.map(parseFileObject));
      setImages(newFiles);
      setError('');
      setSelectedImages(response);
    } catch (e) {
      console.log(e);
    }
  };
  const parseFileObject = async (file: ImageResults) => {
    const base64 = await fileBase64(file?.path);
    const fileObject = {
      fileName: file?.fileName,
      uri: file?.path,
      type: file?.mime,
      fileSize: file?.size,
      base64: base64,
      loading: false,
    };
    return fileObject;
  };
  const handleRemoveImage = (index: number) => {
    const reducedArray = [...images];
    reducedArray.splice(index, 1);
    setError('');
    setImages(reducedArray);
    const reducedSelectedArray = [...selectedImages];
    reducedSelectedArray.splice(index, 1);
    setSelectedImages(reducedSelectedArray);
  };
  const uploadAllSelectedFiles = async () => {
    try {
      const signedIdArray = await Promise.all(
        images.map((file, index) => uploadFileAtIndex(index)),
      );
      return signedIdArray;
    } catch (e) {
      console.log(e);
      setError('이미지 업로드중 문제가 발생하였습니다.');
      setImages(setAllSelectedFileNotLoading);
      return [];
    }
  };
  const setAllSelectedFileNotLoading = (prevSelectedFiles: FileObject[]) => {
    const newSelectedFiles = prevSelectedFiles.map((file: FileObject) => {
      file.loading = false;
      return file;
    });
    return newSelectedFiles;
  };
  const uploadFileAtIndex = async (index: number) => {
    setImages(prevSelectedFiles =>
      setSelectedFileLoadingAtIndex(prevSelectedFiles, index, true),
    );
    const res = await upload(images[index]);
    setImages(prevSelectedFiles =>
      setSelectedFileLoadingAtIndex(prevSelectedFiles, index, false),
    );
    return res;
  };
  const setSelectedFileLoadingAtIndex = (
    prevSelectedFiles: FileObject[],
    index: number,
    bool: boolean,
  ) => {
    const newSelectedFiles = [...prevSelectedFiles];
    newSelectedFiles[index].loading = bool;
    return newSelectedFiles;
  };
  const upload = async (file: FileObject) => {
    const blob_signed_id = await uploadFile(file);
    return blob_signed_id;
  };
  return {
    images,
    error,
    setError,
    handleAddImages,
    handleRemoveImage,
    uploadAllSelectedFiles,
  };
}
