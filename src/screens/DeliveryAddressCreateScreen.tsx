import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ChevronLeft, X} from 'react-native-feather';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import {COLORS} from 'src/modules/styles';
import Postcode from '@actbase/react-daum-postcode';
import {useDeliveryAddressCreate} from 'src/hooks/useDeliveryAddressCreate';
import {TextField} from 'src/components/TextField';
import {ActivityIndicator} from 'react-native';

export const DeliveryAddressCreateScreen = ({
  route: {
    params: {callback},
  },
}: any) => {
  const {goBack} = useNavigation();
  const {
    error,
    setError,
    deliveryAddress,
    loading,
    handleChangeDeliveryAddress,
    specifics,
    handleChangeSpecifics,
    deliveryAddressCreate,
  } = useDeliveryAddressCreate({callback});
  return (
    <ScreenWrapper
      bg={COLORS.gray[100]}
      header={
        <Row itemsCenter h45 px15>
          <Col
            onPress={
              deliveryAddress ? () => handleChangeDeliveryAddress(null) : goBack
            }>
            {deliveryAddress ? (
              <ChevronLeft
                color={COLORS.black}
                width={30}
                height={30}
                strokeWidth={1.5}
              />
            ) : (
              <X
                color={COLORS.black}
                width={30}
                height={30}
                strokeWidth={1.5}
              />
            )}
          </Col>
          <Col auto>
            <Span bold fontSize={17}>
              배송지 추가하기
            </Span>
          </Col>
          <Col itemsEnd />
        </Row>
      }>
      <Div flex={1}>
        {error ? (
          <Div px15 py10>
            <Span danger>{error}</Span>
          </Div>
        ) : null}
        {deliveryAddress ? (
          <Div flex={1}>
            <Div my10 bgWhite py30 px15>
              <Div>
                <Span bold fontSize={21}>
                  {deliveryAddress.buildingName || deliveryAddress.address}
                </Span>
              </Div>
              <Row itemsCenter py10>
                <Col auto bgGray100 itemsCenter justifyCenter p4 rounded3 mr4>
                  <Span gray700 medium fontSize={10}>
                    도로명
                  </Span>
                </Col>
                <Col>
                  <Span gray700 medium fontSize={14}>
                    {deliveryAddress.address}
                  </Span>
                </Col>
              </Row>
              <Div>
                <TextField
                  value={specifics}
                  placeholder={'상세 주소 입력'}
                  gray200
                  fontSize={17}
                  onChangeText={handleChangeSpecifics}
                />
              </Div>
              <Div
                bg={
                  !error && specifics
                    ? COLORS.primary.DEFAULT
                    : COLORS.gray[300]
                }
                py15
                rounded5
                itemsCenter
                justifyCenter
                mt20
                onPress={deliveryAddressCreate}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Span white bold fontSize={16}>
                    완료
                  </Span>
                )}
              </Div>
            </Div>
          </Div>
        ) : (
          <Postcode
            style={{flex: 1}}
            jsOptions={{animation: true}}
            onSelected={(data: any) => handleChangeDeliveryAddress(data)}
            onError={() => setError('다시 선택해주세요')}
          />
        )}
      </Div>
    </ScreenWrapper>
  );
};
