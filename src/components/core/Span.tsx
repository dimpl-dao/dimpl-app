import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {mergePropsWithStyleComp} from 'src/components/core/ViewComponents';
import {COLORS} from 'src/modules/styles';
import {
  addBackgroundStyles,
  addBorderStyles,
  addLayoutStyles,
  addStyles,
  addTextStyles,
} from 'src/utils/styleUtils';

const getTextStyles = (props: any) => {
  const {style} = props;
  let arr: any[] = [];
  Object.keys(props).forEach(key => {
    if (props[key]) {
      addLayoutStyles(props, arr, key);
      addBackgroundStyles(props, arr, key);
      addBorderStyles(props, arr, key);
      addTextStyles(props, arr, key);
    }
  });
  addStyles(arr, style);
  return arr;
};

export const Span = (props: any) => {
  const {innerRef} = props;
  const mergedProps = mergePropsWithStyleComp(props);
  const textStyles = getTextStyles(mergedProps);
  const sheet = StyleSheet.create({
    style: StyleSheet.flatten(textStyles),
  });
  return (
    <Text
      ref={innerRef}
      {...mergedProps}
      selectable
      style={[
        {
          color: COLORS.black,
          fontSize: 13,
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        sheet.style,
      ]}>
      {props.children}
    </Text>
  );
};
