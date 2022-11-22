import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Camera, X} from 'react-native-feather';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Img} from 'src/components/core/Img';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {ScrollView} from 'src/components/core/ViewComponents';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import {TextField} from 'src/components/TextField';
import {useListingCreate} from 'src/hooks/useListingCreate';
import {ICONS} from 'src/modules/icons';
import {COLORS} from 'src/modules/styles';

const SelectedImageForListing = ({
  loading,
  source,
  index,
  onPress,
}: {
  loading: boolean;
  source: string;
  index: number;
  onPress: Function;
}) => {
  const handlePressIcon = () => {
    if (!loading) {
      onPress(index);
    }
  };
  return (
    <Div h70 w70 itemsEnd ml15 relative>
      <Img uri={source} h70 w70 rounded3 />
      {index === 0 && (
        <Div
          absolute
          w70
          h25
          bottom0
          bgBlack
          itemsCenter
          justifyCenter
          borderBottomRightRadius={3}
          borderBottomLeftRadius={3}>
          <Span white>대표 사진</Span>
        </Div>
      )}
      {loading && (
        <Div
          h70
          w70
          itemsCenter
          justifyCenter
          absolute
          bg={'rgba(0,0,0,0.5)'}
          rounded3>
          <ActivityIndicator />
        </Div>
      )}
      {!loading && (
        <Div
          absolute
          top={-5}
          right={-5}
          bgBlack
          w20
          h20
          rounded30
          itemsCenter
          justifyCenter
          onPress={handlePressIcon}>
          <X color={COLORS.white} width={17} height={17} strokeWidth={1.8} />
        </Div>
      )}
    </Div>
  );
};

enum DeliveryTime {
  FAST,
  NORMAL,
  SLOW,
}

export const ListingCreateScreen = () => {
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
    title,
    loading,
    handleChangeTitle,
    description,
    handleChangeDescription,
    price,
    handleChangePrice,
    deposit,
    handleChangeDeposit,
    deliveryTime,
    handleChangeDeliveryTime,
    images,
    handleAddImages,
    handleRemoveImage,
    listingCreateWithKlip,
    listingCreateWithKaikas,
  } = useListingCreate();
  const setDepositWithPercent = (percent: number) => {
    if (price) {
      handleChangeDeposit(
        (Math.ceil(parseInt(price) * 1000 * percent) / 1000).toString(),
      );
    }
  };
  const setDeliveryTimeWithEnum = (enumerable: DeliveryTime) => {
    switch (enumerable) {
      case DeliveryTime.FAST:
        handleChangeDeliveryTime('3');
        break;
      case DeliveryTime.NORMAL:
        handleChangeDeliveryTime('7');
        break;
      case DeliveryTime.SLOW:
        handleChangeDeliveryTime('10');
        break;
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
              중고거래 글쓰기
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
          <ScrollView flex={1} relative horizontal py25>
            <Div
              h70
              w70
              itemsCenter
              justifyCenter
              borderGray200
              border={1}
              rounded3
              ml15>
              <Div itemsCenter justifyCenter onPress={handleAddImages}>
                <Camera
                  color={COLORS.white}
                  fill={COLORS.black}
                  width={20}
                  height={20}
                />
                <Span gray600 mt3>
                  {images.length}/10
                </Span>
              </Div>
            </Div>
            {images.map((image, index) => (
              <SelectedImageForListing
                loading={image.loading}
                source={image.uri}
                index={index}
                onPress={handleRemoveImage}
              />
            ))}
          </ScrollView>
          <Div mx15>
            <Div borderTop={1} borderGray100>
              <TextField
                value={title}
                placeholder={'글 제목'}
                gray200
                mt20
                mb15
                fontSize={17}
                onChangeText={handleChangeTitle}
              />
            </Div>
            <Div borderTop={1} borderGray100>
              <TextField
                keyboardType="numeric"
                value={price}
                placeholder={'가격 (KLAY)'}
                gray200
                mt15
                mb15
                fontSize={17}
                onChangeText={handleChangePrice}
              />
            </Div>
            <Div borderTop={1} borderGray100>
              <Row py10 itemsCenter>
                <Col mr10 pb10>
                  <TextField
                    keyboardType="numeric"
                    value={deposit}
                    placeholder={'보증금 가격 (KLAY)'}
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
              <Row py10 itemsCenter>
                <Col mr10 pb10>
                  <TextField
                    keyboardType="numeric"
                    value={deliveryTime}
                    placeholder={'배송기한 (일)'}
                    gray200
                    fontSize={17}
                    onChangeText={handleChangeDeliveryTime}
                  />
                </Col>
                <Col
                  auto
                  {...(deliveryTime === '3'
                    ? buttonActiveProps
                    : buttonInactiveProps)}
                  p10
                  rounded5
                  mr10
                  onPress={() => setDeliveryTimeWithEnum(DeliveryTime.FAST)}>
                  <Span
                    bold
                    {...(deliveryTime === '3'
                      ? textActiveProps
                      : textInactiveProps)}>
                    빠르게
                  </Span>
                </Col>
                <Col
                  auto
                  {...(deliveryTime === '7'
                    ? buttonActiveProps
                    : buttonInactiveProps)}
                  p10
                  rounded5
                  mr10
                  onPress={() => setDeliveryTimeWithEnum(DeliveryTime.NORMAL)}>
                  <Span
                    bold
                    {...(deliveryTime === '7'
                      ? textActiveProps
                      : textInactiveProps)}>
                    중간
                  </Span>
                </Col>
                <Col
                  auto
                  {...(deliveryTime === '10'
                    ? buttonActiveProps
                    : buttonInactiveProps)}
                  p10
                  rounded5
                  mr10
                  onPress={() => setDeliveryTimeWithEnum(DeliveryTime.SLOW)}>
                  <Span
                    bold
                    {...(deliveryTime === '10'
                      ? textActiveProps
                      : textInactiveProps)}>
                    천천히
                  </Span>
                </Col>
              </Row>
            </Div>
            <Div borderTop={1} borderGray100>
              <TextField
                value={description}
                placeholder={'내용'}
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
          <Row>
            <Col mr5 onPress={listingCreateWithKlip}>
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
                      <Span bold fontSize={11}>
                        클립으로 완료하기
                      </Span>
                    </Col>
                  </>
                )}
                <Col />
              </Row>
            </Col>
            <Col ml5 onPress={listingCreateWithKaikas}>
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
                      <Span white bold fontSize={11}>
                        카이카스로 완료하기
                      </Span>
                    </Col>
                  </>
                )}
                <Col />
              </Row>
            </Col>
          </Row>
        </Div>
      </Div>
    </ScreenWrapper>
  );
};
