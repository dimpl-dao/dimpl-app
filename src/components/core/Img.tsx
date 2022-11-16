import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  addBackgroundStyles,
  addBorderStyles,
  addImageStyles,
  addLayoutStyles,
  addStyles,
} from 'src/utils/styleUtils';
import {mergePropsWithStyleComp} from 'src/components/core/ViewComponents';
import FastImage from 'react-native-fast-image';

const getImageStyles = (props: any) => {
  const {style} = props;
  let arr: any[] = [];
  Object.keys(props).forEach(key => {
    if (props[key]) {
      addLayoutStyles(props, arr, key);
      addBackgroundStyles(props, arr, key);
      addBorderStyles(props, arr, key);
      addImageStyles(props, arr, key);
    }
  });
  addStyles(arr, style);
  return arr;
};

export const Img = (props: any) => {
  const {
    innerRef,
    uri,
    cache,
    source,
    a_source,
    isActive,
    enablePlaceholder = false,
    legacy = false,
  } = props;
  const mergedProps = mergePropsWithStyleComp(props);
  const imageStyles = getImageStyles(mergedProps);
  const sheet = StyleSheet.create({
    style: StyleSheet.flatten(imageStyles),
  });
  const [error, setError] = useState(enablePlaceholder);
  const s = uri
    ? {
        uri: uri,
        cache: cache,
      }
    : isActive
    ? a_source
    : source;
  if (legacy) {
    return (
      <Image
        ref={innerRef}
        {...mergedProps}
        style={sheet.style}
        source={error ? null : s}
        onError={() => setError(true)}
      />
    );
  }
  return (
    <FastImage
      {...mergedProps}
      style={sheet.style}
      source={error ? null : s}
      onError={() => setError(true)}
    />
  );
};
