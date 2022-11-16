import React from 'react';
import {StyleSheet} from 'react-native';
import {Div, DivProps} from './Div';

export const Row = (props: JSX.IntrinsicAttributes & DivProps) => {
  const {innerRef, h, size, style} = props;
  const flattenedStyle = StyleSheet.flatten(style);
  const existHeight = h || (flattenedStyle && flattenedStyle.height);
  return (
    <Div
      innerRef={innerRef}
      extraStyle={[
        {
          flexDirection: 'row',
        },
        (existHeight || size) && {
          flex: size ? size : existHeight ? 0 : 1,
        },
      ]}
      {...props}>
      {props.children}
    </Div>
  );
};
