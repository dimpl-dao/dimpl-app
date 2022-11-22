import {fileChecksum} from 'src/utils/fileUtils';
import {getKeyFromUri} from 'src/utils/uriUtils';
import {Buffer} from 'buffer';
import {isContentTypeImage} from 'src/utils/imageUtils';
import useVideoConvert from './useVideoConvert';
import APIS from 'src/modules/apis';
import {promiseFnPure} from 'src/utils/apiUtils';

export enum FileUploadReturnType {
  Key,
  BlobSignedId,
}
type PresignedUrlObject = {
  direct_upload: {
    url: string;
    headers: any;
  };
};
export default function useFileUpload({
  attachedRecord,
}: {
  attachedRecord: string;
}) {
  const convert = useVideoConvert();

  const createPresignedUrl = async (
    name: string,
    type: string,
    byte_size: number,
    checksum: string,
    attached_record: string,
    metadata = {},
  ) => {
    const body = {
      file: {
        filename: name,
        byte_size: byte_size,
        checksum: checksum,
        content_type: type === 'image/jpg' ? 'image/jpeg' : type,
        metadata,
      },
      attached_record,
    };
    const res = await (APIS.file.image().postWithToken as Function)(body);
    return res;
  };
  const uploadImageToPresignedUrl = async (
    presignedUrlObject: PresignedUrlObject,
    base64: string,
  ) => {
    const res = await promiseFnPure({
      url: presignedUrlObject.direct_upload.url,
      body: Buffer.from(base64, 'base64'),
      method: 'put',
      headers: {
        ...presignedUrlObject.direct_upload.headers,
        'Content-Encoding': 'base64',
      },
    });
    if (res.status === 200) {
      return res.url;
    }
    return '';
  };
  const uploadVideoToPresignedUrl = async (
    presignedUrlObject: PresignedUrlObject,
    file: any,
  ) => {
    const res = await promiseFnPure({
      url: presignedUrlObject.direct_upload.url,
      body: file,
      method: 'put',
      headers: presignedUrlObject.direct_upload.headers,
    });
    if (res.status === 200) {
      return res.url;
    }
    return '';
  };
  const uploadFile = async (
    file: any,
    returnType = FileUploadReturnType.Key,
  ) => {
    let blob = null;
    if (file.type && file.type.startsWith('video')) {
      if (file.type === 'video/quicktime') {
        const url = await convert(file.uri);
        file.uri = url;
        file.type = 'video/mp4';
        file.fileName = url.split('/')[url.split('/').length - 1];
      }
      blob = await (await fetch(file.uri)).blob();
      file.fileSize = (blob as any)._data.size;
    }
    if (file.type && file.type === 'image/heic') {
      const fileName = file?.fileName;
      file.fileName = fileName
        .split('.')
        .splice(0, fileName.split('.').length - 1)
        .concat('jpg')
        .join('.');
      const type = file?.type;
      file.type = type
        .split('/')
        .splice(0, type.split('/').length - 1)
        .concat('jpg')
        .join('/');
    }
    const checksum = await fileChecksum(file);
    const data = await createPresignedUrl(
      file.fileName,
      file.type,
      file.fileSize,
      checksum,
      attachedRecord,
    );
    if (isContentTypeImage(file.type)) {
      const uploadImageToPresignedUrlRes = await uploadImageToPresignedUrl(
        data.file,
        file.base64,
      );
      if (!uploadImageToPresignedUrlRes) {
        throw new Error();
      }
      return returnType === FileUploadReturnType.Key
        ? getKeyFromUri(uploadImageToPresignedUrlRes)
        : data.file.blob_signed_id;
    }
    const uploadToPresignedUrlRes = await uploadVideoToPresignedUrl(
      data.file,
      blob,
    );
    return returnType === FileUploadReturnType.Key
      ? getKeyFromUri(uploadToPresignedUrlRes)
      : data.presigned_url_object.blob_signed_id;
  };

  return {uploadFile};
}
