import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  Check,
  DollarSign,
  Loader,
  LogOut,
  Repeat,
  ShoppingBag,
  ShoppingCart,
  User,
} from 'react-native-feather';
import {BlankProfile} from 'src/components/BlankProfile';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {ScrollView} from 'src/components/core/ViewComponents';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import {useLogout} from 'src/hooks/useLogout';
import {useNavigate} from 'src/hooks/useNavigate';
import APIS from 'src/modules/apis';
import {SCREENS} from 'src/modules/screens';
import {COLORS} from 'src/modules/styles';
import {BidStatus} from 'src/types/bid';
import {ListingStatus} from 'src/types/listing';
import {truncateAddress} from 'src/utils/blockchainUtils';

export const ProfileScreen = () => {
  const {
    data: {user},
  } = useQuery({
    queryKey: [APIS.user._().key],
    queryFn: APIS.user._().getWithToken,
    refetchOnMount: false,
  });
  const logout = useLogout();
  const navToListingList = useNavigate({screen: SCREENS.ListingList.name});
  const navToBidList = useNavigate({screen: SCREENS.BidList.name});
  const gotoListingList = (status: ListingStatus, title: string) => {
    const api = (params: {cursor?: string; limit?: number}) => {
      return APIS.listing.list(
        status,
        user.klaytn_address,
        params?.limit,
        params?.cursor,
      );
    };
    navToListingList({api, title}, {api});
  };
  const gotoBidList = (status: BidStatus, title: string) => {
    const api = (params: {cursor?: string; limit?: number}) => {
      return APIS.bid.list(
        status,
        user.klaytn_address,
        params?.limit,
        params?.cursor,
      );
    };
    navToBidList({api, title}, {api});
  };
  return (
    <ScreenWrapper
      bg={COLORS.gray[100]}
      header={
        <Row h50 itemsCenter px15>
          <Col auto>
            <Span fontSize={19} bold>
              나의 딤플...
            </Span>
          </Col>
          <Col />
          <Col auto onPress={logout}>
            <LogOut
              width={22}
              height={22}
              strokeWidth={2}
              color={COLORS.black}
            />
          </Col>
        </Row>
      }>
      <ScrollView flex={1}>
        <Row px20 py20 itemsCenter bgWhite>
          <Col auto mr15>
            <Div
              itemsCenter
              justifyCenter
              rounded100
              border={1.5}
              borderBlack
              h70
              w70>
              <BlankProfile w={66} h={66} address={user.klaytn_address} />
            </Div>
          </Col>
          <Col>
            <Div>
              <Span bold>{truncateAddress(`0x${user.klaytn_address}`)}</Span>
            </Div>
          </Col>
        </Row>
        <Div px15 py20 bgWhite mt8>
          <Span bold fontSize={16}>
            판매
          </Span>
          <Row mt10>
            <Col
              itemsCenter
              justifyCenter
              onPress={() =>
                gotoListingList(ListingStatus.CREATED, '보증금 미확인')
              }>
              <Div border={1.5} borderBlack rounded100 p15>
                <Loader
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.black}
                />
              </Div>
              <Div mt10 itemsCenter>
                <Span medium>보증금 미확인</Span>
              </Div>
            </Col>
            <Col
              itemsCenter
              justifyCenter
              onPress={() => gotoListingList(ListingStatus.PAID, '판매중')}>
              <Div border={1.5} borderBlack rounded100 p15>
                <DollarSign
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.black}
                />
              </Div>
              <Div mt10>
                <Span medium>판매중</Span>
              </Div>
            </Col>
            <Col
              itemsCenter
              justifyCenter
              onPress={() => gotoListingList(ListingStatus.LOCKED, '거래중')}>
              <Div border={1.5} borderBlack rounded100 p15>
                <Repeat
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.black}
                />
              </Div>
              <Div mt10>
                <Span medium>거래중</Span>
              </Div>
            </Col>
            <Col
              itemsCenter
              justifyCenter
              onPress={() =>
                gotoListingList(ListingStatus.COMPLETED, '판매 완료')
              }>
              <Div border={1.5} borderBlack rounded100 p15>
                <Check
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.black}
                />
              </Div>
              <Div mt10>
                <Span medium>판매 완료</Span>
              </Div>
            </Col>
          </Row>
        </Div>
        <Div px15 py20 bgWhite mt8>
          <Span bold fontSize={16}>
            구매
          </Span>
          <Row mt10>
            <Col
              itemsCenter
              justifyCenter
              onPress={() => gotoBidList(BidStatus.CREATED, '판매중')}>
              <Div border={1.5} borderBlack rounded100 p15>
                <Loader
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.black}
                />
              </Div>
              <Div mt10 itemsCenter>
                <Span medium>보증금 미확인</Span>
              </Div>
            </Col>
            <Col
              itemsCenter
              justifyCenter
              onPress={() => gotoBidList(BidStatus.PAID, '보증금 미확인')}>
              <Div border={1.5} borderBlack rounded100 p15>
                <ShoppingBag
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.black}
                />
              </Div>
              <Div mt10>
                <Span medium>구매 제안중</Span>
              </Div>
            </Col>
            <Col itemsCenter justifyCenter>
              <Div border={1.5} borderBlack rounded100 p15>
                <Repeat
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.black}
                />
              </Div>
              <Div mt10>
                <Span medium>거래중</Span>
              </Div>
            </Col>
            <Col itemsCenter justifyCenter>
              <Div border={1.5} borderBlack rounded100 p15>
                <Check
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.black}
                />
              </Div>
              <Div mt10>
                <Span medium>구매 완료</Span>
              </Div>
            </Col>
          </Row>
        </Div>
      </ScrollView>
    </ScreenWrapper>
  );
};
