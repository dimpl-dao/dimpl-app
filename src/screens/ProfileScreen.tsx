import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {
  Check,
  DollarSign,
  Loader,
  ShoppingBag,
  ShoppingCart,
  User,
} from 'react-native-feather';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {ScrollView} from 'src/components/core/ViewComponents';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import {useNavigate} from 'src/hooks/useNavigate';
import APIS from 'src/modules/apis';
import {SCREENS} from 'src/modules/screens';
import {COLORS} from 'src/modules/styles';
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
  const navToListingList = useNavigate({screen: SCREENS.ListingList.name});

  const gotoListingList = () => {
    const api = (params: {cursor?: string; limit?: number}) => {
      return APIS.listing.list(
        ListingStatus.CREATED,
        user.klaytn_address,
        params?.limit,
        params?.cursor,
      );
    };
    navToListingList({api, title: '판매 준비중'}, {api});
  };
  return (
    <ScreenWrapper
      bg={COLORS.gray[100]}
      header={
        <Row h50 itemsCenter px15>
          <Col auto>
            <Span fontSize={19} bold>
              나의 딤플
            </Span>
          </Col>
          <Col />
        </Row>
      }>
      <ScrollView flex={1}>
        <Row px20 py20 itemsCenter bgWhite>
          <Col auto mr15>
            <Div
              itemsCenter
              justifyCenter
              rounded100
              border={1}
              borderGray200
              h70
              w70>
              <User
                width={30}
                height={30}
                strokeWidth={1.5}
                color={COLORS.gray[700]}
              />
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
            <Col itemsCenter justifyCenter onPress={gotoListingList}>
              <Div bgPrimarySoft rounded100 p15>
                <Loader
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.primary.DEFAULT}
                />
              </Div>
              <Div mt10>
                <Span medium>판매 준비중</Span>
              </Div>
            </Col>
            <Col itemsCenter justifyCenter>
              <Div bgPrimarySoft rounded100 p15>
                <DollarSign
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.primary.DEFAULT}
                />
              </Div>
              <Div mt10>
                <Span medium>판매중</Span>
              </Div>
            </Col>
            <Col itemsCenter justifyCenter>
              <Div bgPrimarySoft rounded100 p15>
                <Check
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.primary.DEFAULT}
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
            <Col itemsCenter justifyCenter>
              <Div bgPrimarySoft rounded100 p15>
                <ShoppingCart
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.primary.DEFAULT}
                />
              </Div>
              <Div mt10>
                <Span medium>구매 제안</Span>
              </Div>
            </Col>
            <Col itemsCenter justifyCenter>
              <Div bgPrimarySoft rounded100 p15>
                <ShoppingBag
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.primary.DEFAULT}
                />
              </Div>
              <Div mt10>
                <Span medium>구매중</Span>
              </Div>
            </Col>
            <Col itemsCenter justifyCenter>
              <Div bgPrimarySoft rounded100 p15>
                <Check
                  width={26}
                  height={26}
                  strokeWidth={2}
                  color={COLORS.primary.DEFAULT}
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
