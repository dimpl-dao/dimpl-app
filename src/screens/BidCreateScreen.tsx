import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Plus, Star, X} from 'react-native-feather';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Img} from 'src/components/core/Img';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {ScrollView} from 'src/components/core/ViewComponents';
import {DeliveryAddressCore} from 'src/components/DeliveryAddressCore';
import {ListingCore} from 'src/components/ListingCore';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import {TextField} from 'src/components/TextField';
import {WalletExecuteButton} from 'src/components/WalletExecuteButton';
import {useBidCreate} from 'src/hooks/useBidCreate';
import {ICONS} from 'src/modules/icons';
import {COLORS} from 'src/modules/styles';

export const BidCreateScreen = ({
  route: {
    params: {listing},
  },
}: any) => {
  const price = listing.price;
  const listingId = listing.id;
  const listingHashId = listing.hash_id_string;
  const buttonInactiveProps = {
    border: 1,
    borderColor: COLORS.gray[400],
  };
  const buttonActiveProps = {
    border: 1,
    borderColor: COLORS.primary.DEFAULT,
  };
  const textInactiveProps = {
    color: COLORS.gray[700],
  };
  const textActiveProps = {
    color: COLORS.primary.DEFAULT,
  };
  const {goBack} = useNavigation();
  const {
    error,
    deliveryAddress,
    loading,
    handleChangeDeliveryAddress,
    description,
    handleChangeDescription,
    deposit,
    handleChangeDeposit,
    bidCreateWithKlip,
    bidCreateWithKaikas,
    addDeliveryAddress,
    selectDeliveryAddress,
  } = useBidCreate({
    listingId,
    listingHashId,
    price,
  });
  const setDepositWithPercent = (percent: number) => {
    if (price) {
      handleChangeDeposit(
        (Math.ceil(parseInt(price) * 1000 * percent) / 1000 / 1e18).toString(),
      );
    }
  };
  return (
    <ScreenWrapper
      footerInset
      header={
        <Row itemsCenter h45 px15>
          <Col onPress={goBack}>
            <X color={COLORS.black} width={30} height={30} strokeWidth={1.5} />
          </Col>
          <Col auto>
            <Span bold fontSize={17}>
              거래 제안하기
            </Span>
          </Col>
          <Col itemsEnd />
        </Row>
      }>
      <Div flex={1}>
        <ScrollView flex={1} relative>
          {error ? (
            <Div px15 py10>
              <Span danger>{error}</Span>
            </Div>
          ) : null}
          <Div mx15>
            <ListingCore listing={listing} />
            {deliveryAddress ? (
              <Row itemsCenter>
                <Col>
                  <DeliveryAddressCore deliveryAddress={deliveryAddress} />
                </Col>
                <Col
                  auto
                  px10
                  onPress={() => handleChangeDeliveryAddress(undefined)}>
                  <X
                    color={COLORS.black}
                    width={30}
                    height={30}
                    strokeWidth={1.5}
                  />
                </Col>
              </Row>
            ) : (
              <Row py10>
                <Row
                  mr10
                  auto
                  px10
                  py8
                  rounded3
                  itemsCenter
                  border={1.5}
                  borderBlack
                  onPress={addDeliveryAddress}>
                  <Col auto mr4>
                    <Plus
                      color={COLORS.black}
                      width={20}
                      height={20}
                      strokeWidth={2}
                    />
                  </Col>
                  <Col auto>
                    <Span bold>배송지 추가</Span>
                  </Col>
                </Row>
                <Row
                  mr10
                  auto
                  px10
                  py8
                  rounded3
                  itemsCenter
                  border={1.5}
                  borderBlack
                  onPress={selectDeliveryAddress}>
                  <Col auto mr4>
                    <Star
                      color={COLORS.black}
                      width={20}
                      height={20}
                      strokeWidth={2}
                    />
                  </Col>
                  <Col auto>
                    <Span bold>즐겨찾는 배송지 사용</Span>
                  </Col>
                </Row>
              </Row>
            )}
            <Div borderTop={1} borderGray100>
              <Row py10 itemsCenter>
                <Col mr10 pb10>
                  <TextField
                    keyboardType="numeric"
                    value={deposit}
                    placeholder={'보증금 (KLAY)'}
                    gray200
                    fontSize={17}
                    onChangeText={handleChangeDeposit}
                  />
                </Col>
                <Col
                  auto
                  {...(deposit &&
                  price &&
                  parseFloat(deposit) / parseFloat(price) === 0.03
                    ? buttonActiveProps
                    : buttonInactiveProps)}
                  p10
                  rounded5
                  mr10
                  onPress={() => setDepositWithPercent(0.03)}>
                  <Span
                    bold
                    {...(deposit &&
                    price &&
                    parseFloat(deposit) / parseFloat(price) === 0.03
                      ? textActiveProps
                      : textInactiveProps)}>
                    3%
                  </Span>
                </Col>
                <Col
                  auto
                  {...(deposit &&
                  price &&
                  parseFloat(deposit) / parseFloat(price) === 0.05
                    ? buttonActiveProps
                    : buttonInactiveProps)}
                  p10
                  rounded5
                  mr10
                  onPress={() => setDepositWithPercent(0.05)}>
                  <Span
                    bold
                    {...(deposit &&
                    price &&
                    parseFloat(deposit) / parseFloat(price) === 0.05
                      ? textActiveProps
                      : textInactiveProps)}>
                    5%
                  </Span>
                </Col>
                <Col
                  auto
                  {...(deposit &&
                  price &&
                  parseFloat(deposit) / parseFloat(price) === 0.1
                    ? buttonActiveProps
                    : buttonInactiveProps)}
                  p10
                  rounded5
                  mr10
                  onPress={() => setDepositWithPercent(0.1)}>
                  <Span
                    bold
                    {...(deposit &&
                    price &&
                    parseFloat(deposit) / parseFloat(price) === 0.1
                      ? textActiveProps
                      : textInactiveProps)}>
                    10%
                  </Span>
                </Col>
              </Row>
            </Div>
            <Div borderTop={1} borderGray100>
              <TextField
                value={description}
                placeholder={'기타 전달 사항'}
                gray200
                mt15
                mb15
                fontSize={17}
                onChangeText={handleChangeDescription}
              />
            </Div>
          </Div>
        </ScrollView>
        <Div px15>
          <WalletExecuteButton
            text={
              deposit
                ? `${
                    parseFloat(price) / 1e18 + parseFloat(deposit)
                  } klay 맡겨두기`
                : undefined
            }
            loading={loading}
            onPressKaikas={bidCreateWithKaikas}
            onPressKlip={bidCreateWithKlip}
          />
        </Div>
      </Div>
    </ScreenWrapper>
  );
};
