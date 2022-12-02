import {EventRegister} from 'react-native-event-listeners';

export const expandImageViewerEvent = () => 'expand-image-viewer';

export const expandImageViewer = (images: string[], imageIndex: number) => {
  EventRegister.emit(expandImageViewerEvent(), {
    images: images.map(image => ({uri: image})),
    imageIndex,
  });
};
