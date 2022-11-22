export function getAdjustedHeightFromDimensions({
  width,
  height,
  frameWidth,
}: {
  width: number;
  height: number;
  frameWidth: number;
}) {
  return Math.min((height / width) * frameWidth, frameWidth * 2);
}

export function isContentTypeImage(contentType: string) {
  return contentType?.startsWith('image');
}
