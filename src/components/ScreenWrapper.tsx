import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from 'src/modules/styles';
import {Div} from './core/Div';

export const ScreenWrapper = ({
  children,
  header,
  footerInset,
  bg = COLORS.white,
}: {
  children: React.FC | JSX.Element;
  header?: React.FC | JSX.Element;
  footerInset?: boolean;
  bg?: string;
}) => {
  const notchHeight = useSafeAreaInsets().top;
  const notchBottom = useSafeAreaInsets().bottom;
  return (
    <Div flex={1} bg={bg} pb={footerInset ? notchBottom : 0}>
      {header && (
        <Div bgWhite pt={notchHeight} borderBottom={0.2} borderGray200>
          {header}
        </Div>
      )}
      {children}
    </Div>
  );
};
