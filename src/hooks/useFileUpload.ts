import {fileChecksum} from 'src/utils/fileUtils';
import useVideoConvert from './useVideoConvert';
import APIS from 'src/modules/apis';
import {promiseFnPure} from 'src/utils/apiUtils';

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
  const uploadFileToPresignedUrl = async (
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
  const uploadFile = async (file: any) => {
    if (file.type === 'video/quicktime') {
      const url = await convert(file.uri);
      file.uri = url;
      file.type = 'video/mp4';
      file.fileName = url.split('/')[url.split('/').length - 1];
    }
    const blob = await (await fetch(file.uri)).blob();
    file.fileSize = (blob as any)._data.size;
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
    await uploadFileToPresignedUrl(data.file, blob);
    return data.file.blob_signed_id;
  };

  return {uploadFile};
}
