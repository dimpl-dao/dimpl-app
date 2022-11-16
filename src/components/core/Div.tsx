import React from 'react';
import {TouchableOpacity, View} from './ViewComponents';

export type DivProps = {
  [x: string]: any;
  children?: any;
  onPress?: any;
};

export const Div = (props: DivProps) => {
  const {onPress, ...otherProps} = props;
  return onPress ? (
    <TouchableOpacity {...otherProps} onPress={onPress}>
      {props.children}
    </TouchableOpacity>
  ) : (
    <View {...otherProps}>{props.children}</View>
  );
};
