import React from 'react';
import {useNavigate} from 'src/hooks/useNavigate';
import {SCREENS} from 'src/modules/screens';
import {Listing} from 'src/types/listing';
import {Div} from './core/Div';
import {Span} from './core/Span';
import ImageSlideShow from './ImageSlideShow';
import {pebtoklay} from 'src/utils/klayUtils';
import {timediffer} from 'src/utils/timeUtil';
import {Row} from './core/Row';
import {Col} from './core/Col';
import {Img} from './core/Img';
import {Bid} from 'src/types/bid';
import {BlankProfile} from './BlankProfile';
import {truncateAddress} from 'src/utils/blockchainUtils';

export const BidCore = ({bid}: {bid: Bid}) => {
  return (
    <Row itemsCenter>
      <Col auto mr15>
        <Div
          itemsCenter
          justifyCenter
          rounded100
          border={1}
          borderBlack
          h50
          w50>
          <BlankProfile w={46} h={46} address={bid.user.klaytn_address} />
        </Div>
      </Col>
      <Col>
        <Div>
          <Span fontSize={13} bold>
            {truncateAddress(`0x${bid.user_id}`)}
          </Span>
        </Div>
      </Col>
      <Col />
      <Col auto>
        <Span fontSize={16}>보증금 {parseFloat(bid.deposit) / 1e18} klay</Span>
      </Col>
    </Row>
  );
};
