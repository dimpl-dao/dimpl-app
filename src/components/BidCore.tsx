import React from 'react';
import {Div} from './core/Div';
import {Span} from './core/Span';
import {Row} from './core/Row';
import {Col} from './core/Col';
import {Bid} from 'src/types/bid';
import {BlankProfile} from './BlankProfile';
import {truncateAddress} from 'src/utils/blockchainUtils';
import {useIsMine} from 'src/hooks/useIsMine';
import {useNavigate} from 'src/hooks/useNavigate';
import {SCREENS} from 'src/modules/screens';
import {Check, ChevronRight} from 'react-native-feather';
import {COLORS} from 'src/modules/styles';

export const BidCore = ({
  bid,
  isListingOwner,
  bidSelect,
  selected = false,
}: {
  bid: Bid;
  isListingOwner: boolean;
  bidSelect: Function;
  selected?: boolean;
}) => {
  const isMine = useIsMine(bid.user.klaytn_address);
  const navToBid = useNavigate({screen: SCREENS.Bid.name});
  const gotoBid = () => {
    navToBid({id: bid.id});
  };
  return (
    <Row
      itemsCenter
      py5
      {...((isMine || isListingOwner) && {onPress: gotoBid})}>
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
            {isMine ? '나' : truncateAddress(`0x${bid.user_id}`)}
          </Span>
        </Div>
        <Div mt2>
          <Span fontSize={11} gray700>
            {parseFloat(bid.deposit) / 1e18} klay
          </Span>
        </Div>
      </Col>
      <Col />
      {selected && (
        <>
          <Col auto py6 mr8>
            <Span fontSize={13} gray700>
              거래중
            </Span>
          </Col>
          <Col auto py6>
            <Check color={COLORS.success.DEFAULT} height={24} width={24} />
          </Col>
        </>
      )}
      {!selected && isMine && (
        <Col auto px12 py6 border={1.5} borderBlack rounded3 ml8>
          <Span fontSize={16} medium>
            취소
          </Span>
        </Col>
      )}
      {!selected && isListingOwner && (
        <Col
          auto
          px12
          py6
          border={1.5}
          borderBlack
          rounded3
          ml8
          onPress={() => bidSelect(bid.hash_id_string)}>
          <Span fontSize={16} medium>
            거래하기
          </Span>
        </Col>
      )}
      {!selected && (isMine || isListingOwner) && (
        <Col auto mr={-10}>
          <ChevronRight
            height={32}
            width={32}
            color={COLORS.black}
            strokeWidth={1.5}
          />
        </Col>
      )}
    </Row>
  );
};
