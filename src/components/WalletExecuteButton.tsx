import React from 'react';
import {ActivityIndicator} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import {ICONS} from 'src/modules/icons';
import {COLORS} from 'src/modules/styles';
import {Wallet} from 'src/redux/appReducer';
import {RootState} from 'src/redux/rootReducer';
import {Col} from './core/Col';
import {Div} from './core/Div';
import {Img} from './core/Img';
import {Row} from './core/Row';
import {Span} from './core/Span';

export const WalletExecuteButton = ({
  loading,
  onPressKlip,
  onPressKaikas,
}: {
  loading: {klip: boolean; kaikas: boolean};
  onPressKlip: Function;
  onPressKaikas: Function;
}) => {
  const {wallet} = useSelector(
    (root: RootState) => ({wallet: root.app.wallet}),
    shallowEqual,
  );
  return (
    <Div>
      {wallet === Wallet.KLIP ? (
        <Div onPress={onPressKlip}>
          <Row
            bg={
              !loading.klip && !loading.kaikas
                ? COLORS.klip.DEFAULT
                : COLORS.klip.light
            }
            rounded10
            itemsCenter
            py15>
            <Col />
            {loading.klip ? (
              <ActivityIndicator />
            ) : (
              <>
                <Col auto mr5>
                  <Img source={ICONS.klip} h20 w40 />
                </Col>
                <Col auto ml5>
                  <Span bold fontSize={14}>
                    클립으로 완료하기
                  </Span>
                </Col>
              </>
            )}
            <Col />
          </Row>
        </Div>
      ) : (
        <Div onPress={onPressKaikas}>
          <Row
            bg={
              !loading.klip && !loading.kaikas
                ? COLORS.kaikas.DEFAULT
                : COLORS.kaikas.light
            }
            rounded10
            itemsCenter
            py15>
            <Col />
            {loading.kaikas ? (
              <ActivityIndicator />
            ) : (
              <>
                <Col auto mr5>
                  <Img source={ICONS.kaikasWhite} h20 w20 />
                </Col>
                <Col auto ml5>
                  <Span white bold fontSize={14}>
                    카이카스로 완료하기
                  </Span>
                </Col>
              </>
            )}
            <Col />
          </Row>
        </Div>
      )}
    </Div>
  );
};
