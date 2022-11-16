/* eslint-disable @typescript-eslint/no-unused-vars */
import * as _ from 'lodash';
import {StyleSheet} from 'react-native';
import {COLOR_PALETTE, varStyle} from 'src/modules/styles';

const ACTIVE_PREFIX = 'a_';

export const getObjectName = (obj: {}) => {
  return _.isString(obj) ? obj : Object.keys(obj)[0];
};

export const addIf = (
  ctx: {props: any; arr: any; key: any; isActive: any},
  obj: any,
  style: Function,
) => {
  const {isActive, props, arr, key} = ctx;
  let propName = getObjectName(obj);
  if (isActive && props[ACTIVE_PREFIX + propName]) {
    propName = ACTIVE_PREFIX + propName;
  }
  const evalStyle = _.isFunction(style) ? style(props[propName]) : style;
  if (propName === key) {
    arr.push(evalStyle);
  }
  return propName === key;
};

const addIfPrefix = (
  ctx: {props?: any; arr: any; key: any; isActive: any},
  propName: string,
  style: Function,
) => {
  const {isActive, arr, key} = ctx;
  let prefix = propName;
  if (isActive && _.startsWith(key, ACTIVE_PREFIX + prefix)) {
    prefix = ACTIVE_PREFIX + propName;
  }
  if (_.startsWith(key, prefix)) {
    const postStr = key.substring(prefix.length);
    if (_.isEmpty(postStr)) {
      return false;
    }
    const n = _.toNumber(postStr);
    if (_.isNaN(n)) {
      return false;
    }
    arr.push(_.isFunction(style) ? style(n) : style);
    return true;
  }
  return false;
};

export const addStyles = (arr: Array<any>, style: any) => {
  if (style) {
    arr.push(StyleSheet.flatten(style));
  }
};

export const addLayoutStyles = (
  props: {
    isActive: any;
    absolute: any;
    relative: any;
    left: any;
    right: any;
    top: any;
    bottom: any;
    overflow: any;
    overflowVisible: any;
    overflowHidden: any;
    overflowScroll: any;
    zIndex: any;
    itemsCenter: any;
    itemsStretch: any;
    itemsStart: any;
    itemsEnd: any;
    justifyStart: any;
    justifyEnd: any;
    justifyCenter: any;
    justifyAround: any;
    justifyBetween: any;
    h: any;
    w: any;
    maxH: any;
    minH: any;
    maxW: any;
    minW: any;
    dflex: any;
    dnone: any;
    flex: any;
    flexColumn: any;
    flexRow: any;
    flexWrap: any;
    flexNoWrap: any;
    flexWrapReverse: any;
    m: any;
    ml: any;
    mr: any;
    mb: any;
    mt: any;
    mx: any;
    my: any;
    p: any;
    pl: any;
    pr: any;
    pb: any;
    pt: any;
    px: any;
    py: any;
    opacity: any;
    shadowColor: any;
    shadowOffset: any;
    shadowOpacity: any;
    shadowRadius: any;
    blur: any;
  },
  arr: Array<any>,
  key: string,
) => {
  const {
    isActive,
    absolute,
    relative,
    left,
    right,
    top,
    bottom,
    overflow,
    overflowVisible,
    overflowHidden,
    overflowScroll,
    zIndex,
    itemsCenter,
    itemsStretch,
    itemsStart,
    itemsEnd,
    justifyStart,
    justifyEnd,
    justifyCenter,
    justifyAround,
    justifyBetween,
    h,
    w,
    maxH,
    minH,
    maxW,
    minW,
    dflex,
    dnone,
    flex,
    flexColumn,
    flexRow,
    flexWrap,
    flexNoWrap,
    flexWrapReverse,
    m,
    ml,
    mr,
    mb,
    mt,
    mx,
    my,
    p,
    pl,
    pr,
    pb,
    pt,
    px,
    py,
    opacity,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    blur,
  } = props;
  const ctx = {props, arr, key, isActive};

  // height & width
  if (addIf(ctx, {h}, (v: any) => ({height: v}))) {
    return;
  }
  if (addIf(ctx, {maxH}, (v: any) => ({maxHeight: v}))) {
    return;
  }
  if (addIf(ctx, {minH}, (v: any) => ({minHeight: v}))) {
    return;
  }
  if (addIf(ctx, {w}, (v: any) => ({width: w}))) {
    return;
  }
  if (addIf(ctx, {maxW}, (v: any) => ({maxWidth: maxW}))) {
    return;
  }
  if (addIf(ctx, {minW}, (v: any) => ({minWidth: minW}))) {
    return;
  }

  if (addIfPrefix(ctx, 'w', (n: any) => ({width: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'h', (n: any) => ({height: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'maxW', (n: any) => ({maxWidth: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'maxH', (n: any) => ({maxHeight: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'minW', (n: any) => ({maxWidth: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'minH', (n: any) => ({maxHeight: n}))) {
    return;
  }

  // layout
  if (addIf(ctx, {absolute}, (v: any) => ({position: 'absolute'}))) {
    return;
  }
  if (addIf(ctx, {relative}, (v: any) => ({position: 'relative'}))) {
    return;
  }
  if (addIf(ctx, {dflex}, (v: any) => ({display: 'flex'}))) {
    return;
  }
  if (addIf(ctx, {dnone}, (v: any) => ({display: 'none'}))) {
    return;
  }
  if (addIf(ctx, {zIndex}, (v: any) => ({zIndex: v}))) {
    return;
  }
  if (addIfPrefix(ctx, 'zIndex', (n: any) => ({zIndex: n}))) {
    return;
  }

  if (addIf(ctx, {left}, (v: any) => ({left: _.isBoolean(v) ? 0 : v}))) {
    return;
  }
  if (addIf(ctx, {right}, (v: any) => ({right: _.isBoolean(v) ? 0 : v}))) {
    return;
  }
  if (addIf(ctx, {top}, (v: any) => ({top: _.isBoolean(v) ? 0 : v}))) {
    return;
  }
  if (addIf(ctx, {bottom}, (v: any) => ({bottom: _.isBoolean(v) ? 0 : v}))) {
    return;
  }
  if (addIfPrefix(ctx, 'left', (n: any) => ({left: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'right', (n: any) => ({right: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'top', (n: any) => ({top: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'bottom', (n: any) => ({bottom: n}))) {
    return;
  }

  if (addIf(ctx, {flex}, (v: any) => ({flex: _.isNumber(v) ? v : 1}))) {
    return;
  }
  if (addIf(ctx, {flexRow}, (v: any) => ({flexDirection: 'row'}))) {
    return;
  }
  if (addIf(ctx, {flexColumn}, (v: any) => ({flexDirection: 'column'}))) {
    return;
  }
  if (addIf(ctx, {flexWrap}, (v: any) => ({flexWrap: 'wrap'}))) {
    return;
  }
  if (addIf(ctx, {flexNoWrap}, (v: any) => ({flexWrap: 'nowrap'}))) {
    return;
  }
  if (addIf(ctx, {flexWrapReverse}, (v: any) => ({flexWrap: 'wrap-reverse'}))) {
    return;
  }
  if (addIf(ctx, {overflow}, (v: any) => ({overflow: v}))) {
    return;
  }
  if (addIf(ctx, {overflowHidden}, (v: any) => ({overflow: 'hidden'}))) {
    return;
  }
  if (addIf(ctx, {overflowVisible}, (v: any) => ({overflow: 'visible'}))) {
    return;
  }
  if (addIf(ctx, {overflowScroll}, (v: any) => ({overflow: 'scroll'}))) {
    return;
  }
  if (addIf(ctx, {itemsStart}, (v: any) => ({alignItems: 'flex-start'}))) {
    return;
  }
  if (addIf(ctx, {itemsEnd}, (v: any) => ({alignItems: 'flex-end'}))) {
    return;
  }
  if (addIf(ctx, {itemsCenter}, (v: any) => ({alignItems: 'center'}))) {
    return;
  }
  if (addIf(ctx, {itemsStretch}, (v: any) => ({alignItems: 'stretch'}))) {
    return;
  }
  if (
    addIf(ctx, {justifyStart}, (v: any) => ({justifyContent: 'flex-start'}))
  ) {
    return;
  }
  if (addIf(ctx, {justifyCenter}, (v: any) => ({justifyContent: 'center'}))) {
    return;
  }
  if (addIf(ctx, {justifyEnd}, (v: any) => ({justifyContent: 'flex-end'}))) {
    return;
  }
  if (
    addIf(ctx, {justifyBetween}, (v: any) => ({
      justifyContent: 'space-between',
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {justifyAround}, (v: any) => ({
      justifyContent: 'space-around',
    }))
  ) {
    return;
  }

  // margin & padding
  if (addIf(ctx, {m}, (v: any) => ({margin: v}))) {
    return;
  }
  if (addIf(ctx, {ml}, (v: any) => ({marginLeft: v}))) {
    return;
  }
  if (addIf(ctx, {mr}, (v: any) => ({marginRight: v}))) {
    return;
  }
  if (addIf(ctx, {mt}, (v: any) => ({marginTop: v}))) {
    return;
  }
  if (addIf(ctx, {mb}, (v: any) => ({marginBottom: v}))) {
    return;
  }
  if (addIf(ctx, {mx}, (v: any) => ({marginHorizontal: v}))) {
    return;
  }
  if (addIf(ctx, {my}, (v: any) => ({marginVertical: v}))) {
    return;
  }
  if (addIf(ctx, {p}, (v: any) => ({padding: v}))) {
    return;
  }
  if (addIf(ctx, {pl}, (v: any) => ({paddingLeft: v}))) {
    return;
  }
  if (addIf(ctx, {pr}, (v: any) => ({paddingRight: v}))) {
    return;
  }
  if (addIf(ctx, {pt}, (v: any) => ({paddingTop: v}))) {
    return;
  }
  if (addIf(ctx, {pb}, (v: any) => ({paddingBottom: v}))) {
    return;
  }
  if (addIf(ctx, {px}, (v: any) => ({paddingHorizontal: v}))) {
    return;
  }
  if (addIf(ctx, {py}, (v: any) => ({paddingVertical: v}))) {
    return;
  }

  if (addIfPrefix(ctx, 'm', (n: any) => ({margin: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'mt', (n: any) => ({marginTop: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'mb', (n: any) => ({marginBottom: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'ml', (n: any) => ({marginLeft: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'mr', (n: any) => ({marginRight: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'mx', (n: any) => ({marginHorizontal: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'my', (n: any) => ({marginVertical: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'p', (n: any) => ({padding: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'pt', (n: any) => ({paddingTop: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'pb', (n: any) => ({paddingBottom: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'pl', (n: any) => ({paddingLeft: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'pr', (n: any) => ({paddingRight: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'px', (n: any) => ({paddingHorizontal: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'py', (n: any) => ({paddingVertical: n}))) {
    return;
  }

  // opacity
  if (addIf(ctx, {opacity}, (v: any) => ({opacity: v}))) {
    return;
  }
  //shadow
  if (addIf(ctx, {shadowColor}, (v: any) => ({shadowColor: v}))) {
    return;
  }
  if (addIf(ctx, {shadowOffset}, (v: any) => ({shadowOffset: v}))) {
    return;
  }
  if (addIf(ctx, {shadowOpacity}, (v: any) => ({shadowOpacity: v}))) {
    return;
  }
  if (addIf(ctx, {shadowRadius}, (v: any) => ({shadowRadius: v}))) {
    return;
  }
};

export const addBorderStyles = (
  props: {
    isActive: any;
    borderColor: any;
    borderLeftColor: any;
    borderRightColor: any;
    borderTopColor: any;
    borderBottomColor: any;
    border: any;
    borderLeft: any;
    borderRight: any;
    borderTop: any;
    borderBottom: any;
    rounded: any;
    roundedTop: any;
    roundedTopLeft: any;
    roundedTopRight: any;
    roundedBottom: any;
    roundedBottomLeft: any;
    roundedBottomRight: any;
    roundedLeft: any;
    roundedRight: any;
    solid: any;
    dotted: any;
    dashed: any;
  },
  arr: Array<any>,
  key: string,
) => {
  const {
    isActive,
    borderColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
    borderBottomColor,
    border,
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    rounded,
    roundedTop,
    roundedTopLeft,
    roundedTopRight,
    roundedBottom,
    roundedBottomLeft,
    roundedBottomRight,
    roundedLeft,
    roundedRight,
    solid,
    dotted,
    dashed,
  } = props;
  const ctx = {props, arr, key, isActive};

  // border style
  if (addIf(ctx, {dotted}, (v: any) => ({borderStyle: 'dotted'}))) {
    return;
  }
  if (addIf(ctx, {solid}, (v: any) => ({borderStyle: 'solid'}))) {
    return;
  }
  if (addIf(ctx, {dashed}, (v: any) => ({borderStyle: 'dashed'}))) {
    return;
  }

  // border color
  if (addIf(ctx, {borderColor}, (v: any) => ({borderColor: v}))) {
    return;
  }
  if (addIf(ctx, {borderLeftColor}, (v: any) => ({borderLeftColor: v}))) {
    return;
  }
  if (addIf(ctx, {borderRightColor}, (v: any) => ({borderRightColor: v}))) {
    return;
  }
  if (addIf(ctx, {borderTopColor}, (v: any) => ({borderTopColor: v}))) {
    return;
  }
  if (addIf(ctx, {borderBottomColor}, (v: any) => ({borderBottomColor: v}))) {
    return;
  }
  COLOR_PALETTE.forEach(item => {
    addIf(ctx, `border${item.name}`, () => ({borderColor: item.color}));
    addIf(ctx, `borderLeft${item.name}`, () => ({borderLeftColor: item.color}));
    addIf(ctx, `borderRight${item.name}`, () => ({
      borderRightColor: item.color,
    }));
    addIf(ctx, `borderTop${item.name}`, () => ({borderTopColor: item.color}));
    addIf(ctx, `borderBottom${item.name}`, () => ({
      borderBottomColor: item.color,
    }));
  });
  // border radius
  if (
    addIf(ctx, {rounded}, (v: any) => ({
      borderRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {roundedTop}, (v: any) => ({
      borderTopLeftRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
      borderTopRightRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {roundedBottom}, (v: any) => ({
      borderBottomLeftRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
      borderBottomRightRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {roundedLeft}, (v: any) => ({
      borderTopLeftRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
      borderBottomLeftRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {roundedRight}, (v: any) => ({
      borderTopRightRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
      borderBottomRightRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {roundedTopLeft}, (v: any) => ({
      borderTopLeftRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {roundedTopRight}, (v: any) => ({
      borderTopRightRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {roundedBottomLeft}, (v: any) => ({
      borderBottomLetRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {roundedBottomRight}, (v: any) => ({
      borderBottomRightRadius: _.isNumber(v) ? v : varStyle.defaultBorderRadius,
    }))
  ) {
    return;
  }

  if (addIfPrefix(ctx, 'rounded', (n: any) => ({borderRadius: n}))) {
    return;
  }
  if (
    addIfPrefix(ctx, 'roundedTop', (n: any) => ({
      borderTopLeftRadius: n,
      borderTopRightRadius: n,
    }))
  ) {
    return;
  }
  if (
    addIfPrefix(ctx, 'roundedBottom', (n: any) => ({
      borderBottomLeftRadius: n,
      borderBottomRightRadius: n,
    }))
  ) {
    return;
  }
  if (
    addIfPrefix(ctx, 'roundedLeft', (n: any) => ({
      borderTopLeftRadius: n,
      borderBottomLeftRadius: n,
    }))
  ) {
    return;
  }
  if (
    addIfPrefix(ctx, 'roundedRight', (n: any) => ({
      borderTopRightRadius: n,
      borderBottomRightRadius: n,
    }))
  ) {
    return;
  }
  if (
    addIfPrefix(ctx, 'roundedTopLeft', (n: any) => ({
      borderTopLeftRadius: n,
    }))
  ) {
    return;
  }
  if (
    addIfPrefix(ctx, 'roundedTopRight', (n: any) => ({
      borderTopRightRadius: n,
    }))
  ) {
    return;
  }
  if (
    addIfPrefix(ctx, 'roundedBottomLeft', (n: any) => ({
      borderBottomLeftRadius: n,
    }))
  ) {
    return;
  }
  if (
    addIfPrefix(ctx, 'roundedBottomRight', (n: any) => ({
      borderBottomRightRadius: n,
    }))
  ) {
    return;
  }

  // border width
  if (
    addIf(ctx, {border}, (v: any) => ({borderWidth: _.isNumber(v) ? v : 1}))
  ) {
    return;
  }
  if (
    addIf(ctx, {borderLeft}, (v: any) => ({
      borderLeftWidth: _.isNumber(v) ? v : 1,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {borderRight}, (v: any) => ({
      borderRightWidth: _.isNumber(v) ? v : 1,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {borderTop}, (v: any) => ({
      borderTopWidth: _.isNumber(v) ? v : 1,
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {borderBottom}, (v: any) => ({
      borderBottomWidth: _.isNumber(v) ? v : 1,
    }))
  ) {
    return;
  }

  if (addIfPrefix(ctx, 'border', (n: any) => ({borderWidth: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'borderLeft', (n: any) => ({borderLeftWidth: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'borderRight', (n: any) => ({borderRightWidth: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'borderTop', (n: any) => ({borderTopWidth: n}))) {
    return;
  }
  if (addIfPrefix(ctx, 'borderBottom', (n: any) => ({borderBottomWidth: n}))) {
    return;
  }
};

export const addBackgroundStyles = (
  props: {isActive: any; bg: any; bgColor: any},
  arr: Array<any>,
  key: string,
) => {
  const {isActive, bg, bgColor} = props;

  const ctx = {props, arr, key, isActive};
  // bg
  if (addIf(ctx, {bg}, (v: any) => ({backgroundColor: v}))) {
    return;
  }
  if (addIf(ctx, {bgColor}, (v: any) => ({backgroundColor: v}))) {
    return;
  }
  COLOR_PALETTE.forEach(item => {
    addIf(ctx, `bg${item.name}`, () => ({backgroundColor: item.color}));
  });
  COLOR_PALETTE.forEach(item => {
    addIf(ctx, `bg${item.name}Alpha`, (v: string) => {
      const numStr = ('0' + v).slice(-2);
      return {backgroundColor: `${item.color}${numStr}`};
    });
  });
  COLOR_PALETTE.forEach(item => {
    addIfPrefix(ctx, `bg${item.name}Alpha`, (n: string | number) => {
      if (n >= 100) {
        return {backgroundColor: item.color};
      }
      const numStr = ('0' + n).slice(-2);
      return {
        backgroundColor: `${item.color}${numStr}`,
      };
    });
  });
};

export const addTextStyles = (
  props: {
    isActive: any;
    color: any;
    fontSize: any;
    italic: any;
    weight: any;
    bold: any;
    medium: any;
    regular: any;
    light: any;
    thin: any;
    alignCenter: any;
    alignLeft: any;
    alignRight: any;
    alignJustify: any;
    alignAuto: any;
    lineHeight: any;
    decoNone: any;
    underline: any;
    lineThrough: any;
    fontFamily: any;
    shadowOffset: any;
    shadowColor: any;
    shadowRadius: any;
    letterSpacing: any;
    uppercase: any;
    lowercase: any;
    capitalize: any;
  },
  arr: Array<any>,
  key: string,
) => {
  const {
    isActive,
    color,
    fontSize,
    italic,
    weight,
    bold,
    medium,
    regular,
    light,
    thin,
    alignCenter,
    alignLeft,
    alignRight,
    alignJustify,
    alignAuto,
    lineHeight,
    decoNone,
    underline,
    lineThrough,
    fontFamily,
    shadowOffset,
    shadowColor,
    shadowRadius,
    letterSpacing,
    uppercase,
    lowercase,
    capitalize,
  } = props;
  const ctx = {props, arr, key, isActive};

  if (addIf(ctx, {color}, (v: any) => ({color: v}))) {
    return;
  }
  if (addIf(ctx, {fontSize}, (v: any) => ({fontSize: v}))) {
    return;
  }
  if (addIf(ctx, {italic}, (v: any) => ({fontStyle: 'italic'}))) {
    return;
  }
  if (addIf(ctx, {weight}, (v: any) => ({fontWeight: v}))) {
    return;
  }
  if (addIf(ctx, {bold}, (v: any) => ({fontWeight: 'bold'}))) {
    return;
  }
  if (addIf(ctx, {medium}, (v: any) => ({fontWeight: varStyle.weightMedium}))) {
    return;
  }
  if (
    addIf(ctx, {regular}, (v: any) => ({fontWeight: varStyle.weightRegular}))
  ) {
    return;
  }
  if (addIf(ctx, {light}, (v: any) => ({fontWeight: varStyle.weightLight}))) {
    return;
  }
  if (addIf(ctx, {thin}, (v: any) => ({fontWeight: varStyle.weightThin}))) {
    return;
  }
  if (addIf(ctx, {alignCenter}, (v: any) => ({textAlign: 'center'}))) {
    return;
  }
  if (addIf(ctx, {alignLeft}, (v: any) => ({textAlign: 'left'}))) {
    return;
  }
  if (addIf(ctx, {alignRight}, (v: any) => ({textAlign: 'right'}))) {
    return;
  }
  if (addIf(ctx, {alignJustify}, (v: any) => ({textAlign: 'justify'}))) {
    return;
  }
  if (addIf(ctx, {alignAuto}, (v: any) => ({textAlign: 'auto'}))) {
    return;
  }
  if (addIf(ctx, {lineHeight}, (v: any) => ({lineHeight: v}))) {
    return;
  }
  if (addIf(ctx, {decoNone}, (v: any) => ({textDecorationLine: 'none'}))) {
    return;
  }
  if (
    addIf(ctx, {underline}, (v: any) => ({
      textDecorationLine: lineThrough ? 'underline line-through' : 'underline',
    }))
  ) {
    return;
  }
  if (
    addIf(ctx, {lineThrough}, (v: any) => ({
      textDecorationLine: underline ? 'underline line-through' : 'line-through',
    }))
  ) {
    return;
  }
  if (addIf(ctx, {shadowOffset}, (v: any) => ({textShadowOffset: v}))) {
    return;
  }
  if (addIf(ctx, {shadowColor}, (v: any) => ({textShadowColor: v}))) {
    return;
  }
  if (addIf(ctx, {shadowRadius}, (v: any) => ({textShadowRadius: v}))) {
    return;
  }
  if (addIf(ctx, {fontFamily}, (v: any) => ({fontFamily: v}))) {
    return;
  }
  if (addIf(ctx, {letterSpacing}, (v: any) => ({letterSpacing: v}))) {
    return;
  }
  if (addIf(ctx, {uppercase}, (v: any) => ({textTransfrom: 'upepercase'}))) {
    return;
  }
  if (addIf(ctx, {lowercase}, (v: any) => ({textTransfrom: 'lowercase'}))) {
    return;
  }
  if (addIf(ctx, {capitalize}, (v: any) => ({textTransfrom: 'capitalize'}))) {
    return;
  }

  // color
  COLOR_PALETTE.forEach(item => {
    addIf(ctx, _.lowerFirst(item.name), () => ({color: item.color}));
  });
};

export const addImageStyles = (
  props: {
    isActive: any;
    resizeMode: any;
    resizeCover: any;
    resizeContain: any;
    resizeStretch: any;
    resizeRepeat: any;
    resizeCenter: any;
    tintColor: any;
    aspectRatio: any;
  },
  arr: Array<any>,
  key: string,
) => {
  const {
    isActive,
    resizeMode,
    resizeCover,
    resizeContain,
    resizeStretch,
    resizeRepeat,
    resizeCenter,
    tintColor,
    aspectRatio,
  } = props;
  const ctx = {isActive, props, arr, key};
  // bg
  if (addIf(ctx, {aspectRatio}, (v: any) => ({aspectRatio: v}))) {
    return;
  }
  if (addIf(ctx, {tintColor}, (v: any) => ({tintColor: v}))) {
    return;
  }
  COLOR_PALETTE.forEach(item => {
    return addIf(ctx, `tint${item.name}`, () => ({tintColor: item.color}));
  });
};
