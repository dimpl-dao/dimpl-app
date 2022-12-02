import React from 'react';
import {DeliveryAddress} from 'src/types/deliveryAddress';
import {Col} from './core/Col';
import {Div} from './core/Div';
import {Row} from './core/Row';
import {Span} from './core/Span';

export const DeliveryAddressCore = ({
  deliveryAddress,
  onPress,
}: {
  deliveryAddress: DeliveryAddress;
  onPress?: Function;
}) => {
  return (
    <Div
      bgWhite
      py20
      px15
      {...(typeof onPress === 'function' && {
        onPress: () => onPress(deliveryAddress),
      })}>
      <Div>
        <Span bold fontSize={21}>
          {deliveryAddress.name || deliveryAddress.address_ko}
        </Span>
      </Div>
      <Row itemsCenter mt10>
        <Col auto bgGray100 itemsCenter justifyCenter p4 rounded3 mr4>
          <Span gray700 medium fontSize={10}>
            도로명
          </Span>
        </Col>
        <Col>
          <Span gray700 medium fontSize={14}>
            {deliveryAddress.address_ko} {deliveryAddress.specifics}
          </Span>
        </Col>
      </Row>
    </Div>
  );
};
