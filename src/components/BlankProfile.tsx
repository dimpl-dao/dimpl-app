import React from 'react';
import {WithLocalSvg} from 'react-native-svg';
import {Svg} from 'react-native-svg';
import {SVGS} from 'src/modules/svgs';
import {Div} from './core/Div';

type SVG_KEY = keyof typeof SVGS.face;

export const BlankProfile = ({
  w,
  h,
  address,
}: {
  w: number;
  h: number;
  address: string;
}) => {
  return (
    <Div width={w} height={h} relative rounded={w} overflowHidden>
      <Div absolute>
        <WithLocalSvg
          width={w}
          height={h}
          asset={SVGS.head[address.slice(-2, -1) as SVG_KEY]}
        />
      </Div>
      <Div absolute top={h * 0.3} left={w * 0.35}>
        <WithLocalSvg
          width={w / 1.8}
          height={h / 1.8}
          asset={SVGS.face[address.slice(-1) as SVG_KEY]}
        />
      </Div>
    </Div>
  );
};
