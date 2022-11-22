import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {COLORS, DEVICE_WIDTH} from 'src/modules/styles';
import {ChevronLeft} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {Img} from 'src/components/core/Img';
import {ICONS} from 'src/modules/icons';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import APIS from 'src/modules/apis';
import {useQuery} from '@tanstack/react-query';
import useKlipExecuteContract from 'src/hooks/useKlipExecuteContract';

const KlipTransactScreen = ({
  route: {
    params: {to, value, abi, params, callback},
  },
}: any) => {
  const {data} = useQuery({
    queryKey: [APIS.user._().key],
    queryFn: APIS.user._().get,
  });
  const {goBack} = useNavigation();
  const {
    error,
    loading,
    prepareResult,
    requestExecuteContract,
    checkResultAndCallback,
  } = useKlipExecuteContract();
  const executeContract = () => {
    requestExecuteContract({
      from: data.user.klaytn_address,
      to: to,
      value: value,
      abi: abi,
      params: params,
    });
  };
  const checkResult = () => {
    checkResultAndCallback({
      callback,
    });
  };
  useEffect(() => {
    executeContract();
  }, []);

  return (
    <ScreenWrapper
      footerInset
      header={
        <Div h={50} top0 zIndex={5}>
          <Row itemsCenter h40 px15 absolute w={DEVICE_WIDTH}>
            <Col justifyStart onPress={goBack}>
              <Div auto rounded100>
                <ChevronLeft
                  width={30}
                  height={30}
                  color={COLORS.black}
                  strokeWidth={2}
                />
              </Div>
            </Col>
            <Col auto>
              <Span bold fontSize={18}>
                Kaikas로 로그인
              </Span>
            </Col>
            <Col />
          </Row>
        </Div>
      }>
      <>
        <Div flex={1} px15>
          <Div flex={1} itemsCenter justifyCenter>
            <Div py20>
              <Img source={ICONS.kaikas} h65 w65 />
            </Div>
            <Div mt16>
              <Span fontSize={19} bold textCenter>
                {prepareResult
                  ? '승인하셨나요?'
                  : '카이카스로 거래를 승인해주세요'}
              </Span>
            </Div>
            {error ? (
              <Div mt16>
                <Span danger bold fontSize={16} textCenter>
                  {error}
                </Span>
              </Div>
            ) : null}
          </Div>
          <Row
            bg={loading ? COLORS.kaikas.light : COLORS.kaikas.DEFAULT}
            rounded10
            onPress={
              !loading ? (prepareResult ? checkResult : executeContract) : null
            }
            p15>
            <Col />
            <Col auto>
              {loading ? (
                <ActivityIndicator />
              ) : prepareResult ? (
                <Div>
                  <Span bold white fontSize={16}>
                    로그인 하기
                  </Span>
                </Div>
              ) : (
                <Div>
                  <Span bold white fontSize={16}>
                    완료하기
                  </Span>
                </Div>
              )}
            </Col>
            <Col />
          </Row>
        </Div>
        <Div h={50} bgWhite />
      </>
    </ScreenWrapper>
  );
};

export default KlipTransactScreen;
