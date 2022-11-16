import React from 'react';
import {StyleSheet} from 'react-native';
import {Div, DivProps} from 'src/components/core/Div';

export const Col = (props: JSX.IntrinsicAttributes & DivProps) => {
  const {w, size, style, auto, innerRef} = props;
  const flattenedStyle = StyleSheet.flatten(style);
  const existWidth = w || (flattenedStyle && flattenedStyle.width);
  return (
    <Div
      innerRef={innerRef}
      extraStyle={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          flexDirection: 'column',
        },
        (existWidth || size || !auto) && {
          flex: size ? size : existWidth ? 0 : 1,
        },
      ]}
      {...props}>
      {props.children}
    </Div>
  );
};
