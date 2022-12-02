import React from 'react';
import {useNavigate} from 'src/hooks/useNavigate';
import {SCREENS} from 'src/modules/screens';
import {Bid} from 'src/types/bid';
import {truncateAddress} from 'src/utils/blockchainUtils';
import {pebtoklay} from 'src/utils/klayUtils';
import {timediffer} from 'src/utils/timeUtil';
import {BidStatusButton} from './BidStatusButton';
import {BlankProfile} from './BlankProfile';
import {Col} from './core/Col';
import {Div} from './core/Div';
import {Img} from './core/Img';
import {Row} from './core/Row';
import {Span} from './core/Span';

export const BidFull = ({bid}: {bid: Bid}) => {
  const listing = bid?.listing;
  const deliveryAddress = bid?.delivery_address;
  const navToListing = useNavigate({screen: SCREENS.Listing.name});
  const gotoListing = () => {
    navToListing({id: listing?.id});
  };
  return (
    <Div borderBottom={0.5} pb20 borderGray200>
      <Row itemsCenter px15 py10>
        <Col auto mr15>
          <Div
            itemsCenter
            justifyCenter
            rounded100
            border={1}
            borderBlack
            h40
            w40>
            <BlankProfile w={36} h={36} address={bid.user.klaytn_address} />
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
          <BidStatusButton id={bid.id} status={bid.status} />
        </Col>
      </Row>
      <Row itemsCenter px15>
        <Col auto w40 mr15 />
        <Col>
          {listing ? (
            <Div borderGray200 border={0.5} p15 rounded5>
              <Row itemsCenter onPress={gotoListing}>
                <Div>
                  <Span fontSize={16}>{listing.title}</Span>
                  <Span fontSize={12} mt2 color={'gray'} lineHeight={20}>
                    {'판매자 보증금 ' + pebtoklay(listing.deposit) + ' klay'} •{' '}
                    {timediffer(listing.updated_at)}
                  </Span>
                  <Span fontSize={16} mt6 style={{fontWeight: '600'}}>
                    {pebtoklay(listing.price) + ' klay'}
                  </Span>
                </Div>
              </Row>
            </Div>
          ) : null}
          <Div borderGray200 border={0.5} p15 rounded5 mt10>
            <Span fontSize={13} medium>
              보증금 {parseFloat(bid.deposit) / 1e18} klay
            </Span>
          </Div>
          <Div borderGray200 border={0.5} p15 rounded5 mt10>
            <Div>
              <Span bold fontSize={14}>
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
          <Div borderGray200 border={0.5} p15 rounded5 mt10>
            <Span medium>{bid.description}</Span>
          </Div>
        </Col>
      </Row>
    </Div>
  );
};
