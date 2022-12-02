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

export const ListingCore = ({listing}: {listing: Listing}) => {
  const navToListing = useNavigate({screen: SCREENS.Listing.name});
  const gotoListing = () => {
    navToListing({id: listing.id});
  };

  return (
    <>
      <Row
        py12
        px12
        itemsCenter
        borderBottom={1}
        borderGray200
        bgWhite
        onPress={gotoListing}>
        <Col auto mr14>
          <Img
            // @ts-ignore
            uri={listing.image_uri || listing.image_uris[0]}
            h100
            w100
            rounded5
          />
        </Col>
        {listing.description ? (
          <Div>
            <Span fontSize={19}>{listing.title}</Span>
            <Span fontSize={12} mt2 color={'gray'} lineHeight={20}>
              {'판매자 보증금 ' + pebtoklay(listing.deposit) + ' klay'} •{' '}
              {timediffer(listing.updated_at)}
            </Span>
            <Span fontSize={19} mt6 style={{fontWeight: '600'}}>
              {pebtoklay(listing.price) + ' klay'}
            </Span>
          </Div>
        ) : null}
      </Row>
    </>
  );
};
