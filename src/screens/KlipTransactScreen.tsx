import React, {useEffect} from 'react';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import {COLORS} from 'src/modules/styles';
import {useNavigation} from '@react-navigation/native';
import {Img} from 'src/components/core/Img';
import {ICONS} from 'src/modules/icons';
import {ScreenWrapper} from 'src/components/ScreenWrapper';
import useKlipExecuteContract from 'src/hooks/useKlipExecuteContract';

const KlipTransactScreen = ({
  route: {
    params: {to, value, abi, params, callback},
  },
}: any) => {
  const {goBack} = useNavigation();
  const {requestExecuteContract} = useKlipExecuteContract();
  const executeContract = () => {
    requestExecuteContract({
      to: to,
      value: value,
      abi: abi,
      params: params,
    });
  };
  useEffect(() => {
    executeContract();
  }, []);

  return (
    <ScreenWrapper
      footerInset
      header={
        <Row itemsCenter h50 px15>
          <Col />
          <Col auto>
            <Span bold fontSize={18}>
              클립 승인
            </Span>
          </Col>
          <Col />
        </Row>
      }>
      <>
        <Div flex={1} px15>
          <Div flex={1} itemsCenter justifyCenter>
            <Div py20>
              <Img source={ICONS.klip} h65 w130 />
            </Div>
            <Div mt16>
              <Span fontSize={19} bold textCenter>
                {'승인 하셨나요?'}
              </Span>
            </Div>
          </Div>
          <Row
            bg={COLORS.klip.DEFAULT}
            rounded10
            onPress={typeof callback === 'function' ? callback : goBack}
            p15>
            <Col />
            <Col auto>
              <Div>
                <Span bold fontSize={16}>
                  {typeof callback === 'function' ? '글 확인하기' : '뒤로가기'}
                </Span>
              </Div>
            </Col>
            <Col />
          </Row>
          <Row mt10 bgGray200 rounded10 p15 onPress={executeContract}>
            <Col />
            <Col auto>
              <Div>
                <Span bold fontSize={16}>
                  다시 시도하기
                </Span>
              </Div>
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
